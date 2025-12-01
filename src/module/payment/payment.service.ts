import { JwtPayload } from "jsonwebtoken";
import { IPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { stripe } from "../../helpers/stripe";
import Stripe from "stripe";
import mongoose from "mongoose";
import { IPaymentStatus } from "../booking/booking.interface";
import { Trip } from "../trip/trip.model";

const createPayment = async (payload: Partial<IPayment>, user: JwtPayload) => {
  const payment = await Payment.create(payload);
  const booking = await payment.populate("booking");
  const trip = await booking.populate("trip");
  if (!payment) throw new AppError("Payment failed", 400);

  const userData = await User.findOne({ email: user.email });
  if (!userData) throw new AppError("User does not exist", 400);

  const session = await stripe.checkout.sessions.create({
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
          unit_amount: payment.amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      paymentId: payment._id.toString(),
      tripId: trip._id.toString(),
      userId: userData._id.toString(),
    },
    success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
  });

  return { payment, paymentUrl: session.url };
};

const checkWebHook = async (event: Stripe.Event) => {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentId = session.metadata?.paymentId as string;
    const tripId = session.metadata?.tripId as string;
    const userId = session.metadata?.userId as string;

    const startSession = await mongoose.startSession();

    startSession.startTransaction();

    const res = await Payment.findById(paymentId).session(startSession);
    if (!res) throw new AppError("Payment does not exist", 400);

    res.status = IPaymentStatus.SUCCESS;
    await res.save({ session: startSession });

    const trip = await Trip.findById(tripId).session(startSession);
    if (!trip) throw new AppError("Trip does not exist", 400);

    const participant ={
      user: new mongoose.Types.ObjectId(userId),
      paymentId: paymentId,
      numberOfGuests: res.totalPeople,
      joinedAt: new Date()
    }

    trip.participants = [...(trip?.participants ?? []), participant];
 
    await trip.save({ session: startSession });

    await startSession.commitTransaction();
    await startSession.endSession();

    return true
  }

  return false
};

export const PaymentService = { createPayment, checkWebHook };
