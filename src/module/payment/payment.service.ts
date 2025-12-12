import { JwtPayload } from "jsonwebtoken";
import { IPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { stripe } from "../../helpers/stripe";
import Stripe from "stripe";
import mongoose, { Types } from "mongoose";
import { IPaymentStatus } from "../booking/booking.interface";
import { Trip } from "../trip/trip.model";
import { Booking } from "../booking/booking.model";
import { sendEmail } from "../../utils/sendEmail";
import { IUser } from "../user/user.interface";
import { uploadBufferToCloudinary } from "../../config/cloudinary.config";
import { generatePdf } from "../../utils/invoice";

const createPayment = async (payload: Partial<IPayment>, user: JwtPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const payments = await Payment.create([payload], { session });
    const payment = payments[0];
    if (!payment) throw new AppError("Payment failed", 400);

    const paymentData = await Payment.findById(payment._id).populate("booking").session(session);
    if (!paymentData) throw new AppError("Payment failed", 400);

    const booking = paymentData.booking as unknown as { trip: Types.ObjectId | string };
    const trip = await Trip.findById(booking.trip).session(session);

    if (!trip) throw new AppError("Trip does not exist", 400);

    const userData = await User.findOne({ email: user.email }).session(session);
    if (!userData) throw new AppError("User does not exist", 400);

    // Stripe call (external, cannot rollback with MongoDB)
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: userData.email,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: `Payment for trip ${trip.title}`,
              description: `Payment for trip for ${payload.totalPeople} people`,
            },
            unit_amount: (payment.amount * payload.totalPeople!) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        paymentId: payment._id.toString(),
        tripId: trip._id.toString(),
        userId: userData._id.toString(),
      },
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&paymentId=${payment._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
    });

    await session.commitTransaction();
    session.endSession();

    return { payment: paymentData, paymentUrl: stripeSession.url };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const checkWebHook = async (event: Stripe.Event) => {
  if (event.type !== "checkout.session.completed") return false;

  const session = event.data.object as Stripe.Checkout.Session;

  const paymentId = session.metadata?.paymentId!;
  const tripId = session.metadata?.tripId!;
  const userId = session.metadata?.userId!;

  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  let booking: any;
  let trip: any;
  let payment: any;

  try {
    // PHASE 1 — DATABASE ONLY (fast)
    payment = await Payment.findById(paymentId).session(mongoSession);
    if (!payment) throw new AppError("Payment does not exist", 400);

    payment.status = IPaymentStatus.SUCCESS;
    payment.paymentGatewayData = session.payment_intent;
    await payment.save({ session: mongoSession });

    booking = await Booking.findById(payment.booking)
      .populate("user")
      .session(mongoSession);
    if (!booking) throw new AppError("Booking does not exist", 400);

    booking.paymentStatus = IPaymentStatus.SUCCESS;
    await booking.save({ session: mongoSession });

    trip = await Trip.findById(tripId).session(mongoSession);
    if (!trip) throw new AppError("Trip does not exist", 400);

    const participant = {
      user: new mongoose.Types.ObjectId(userId),
      paymentId,
      numberOfGuests: payment.totalPeople,
      joinedAt: new Date(),
    };

    trip.participants = [...(trip.participants ?? []), participant];
    await trip.save({ session: mongoSession });

    // Commit only database operations
    await mongoSession.commitTransaction();
  } catch (err) {
    await mongoSession.abortTransaction();
    throw err;
  } finally {
    mongoSession.endSession();
  }

  // PHASE 2 — OUTSIDE TRANSACTION (no conflicts)
  const invoiceData = {
    bookingId: booking._id.toString(),
    bookingDate: booking.createdAt,
    userName: booking.user.name,
    tourTitle: trip.title,
    guestCount: payment.totalPeople,
    totalAmount: payment.amount,
  };

  // Generate PDF
  const pdfBuffer = await generatePdf(invoiceData);

  // Upload to Cloudinary
  const cloudinaryResult = await uploadBufferToCloudinary(pdfBuffer, "invoice");

  // Save invoice URL (simple atomic update)
  await Payment.findByIdAndUpdate(paymentId, {
    invoiceUrl: cloudinaryResult!.secure_url,
  });

  // Send email
  await sendEmail({
    to: booking.user.email,
    subject: "Your Booking Invoice",
    templateName: "invoice",
    templateData: invoiceData,
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });

  return true;
};


const getPaymentById = async (paymentId: string) => {
  const payment = await Payment.findById(paymentId).populate("booking");
  let booking = await Booking.findById(payment?.booking).populate("trip").populate("user");
  const tripData = await Trip.findById(booking?.trip).populate("destination");
  // booking = {
  //   ...booking,
  //   trip: {
  //     ...booking!.trip,
  //     destination: tripData?.destination,
  //   },
  // };

  if (!payment) throw new AppError("Payment does not exist", 400);
  return { payment, booking };
};

export const PaymentService = { createPayment, checkWebHook, getPaymentById };
