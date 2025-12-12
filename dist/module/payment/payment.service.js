"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const payment_model_1 = require("./payment.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const stripe_1 = require("../../helpers/stripe");
const mongoose_1 = __importDefault(require("mongoose"));
const booking_interface_1 = require("../booking/booking.interface");
const trip_model_1 = require("../trip/trip.model");
const booking_model_1 = require("../booking/booking.model");
const sendEmail_1 = require("../../utils/sendEmail");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const invoice_1 = require("../../utils/invoice");
const createPayment = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const payments = yield payment_model_1.Payment.create([payload], { session });
        const payment = payments[0];
        if (!payment)
            throw new AppError_1.default("Payment failed", 400);
        const paymentData = yield payment_model_1.Payment.findById(payment._id).populate("booking").session(session);
        if (!paymentData)
            throw new AppError_1.default("Payment failed", 400);
        const booking = paymentData.booking;
        const trip = yield trip_model_1.Trip.findById(booking.trip).session(session);
        if (!trip)
            throw new AppError_1.default("Trip does not exist", 400);
        const userData = yield user_model_1.User.findOne({ email: user.email }).session(session);
        if (!userData)
            throw new AppError_1.default("User does not exist", 400);
        // Stripe call (external, cannot rollback with MongoDB)
        const stripeSession = yield stripe_1.stripe.checkout.sessions.create({
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
                        unit_amount: (payment.amount * payload.totalPeople) * 100,
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
        yield session.commitTransaction();
        session.endSession();
        return { payment: paymentData, paymentUrl: stripeSession.url };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const checkWebHook = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (event.type !== "checkout.session.completed")
        return false;
    const session = event.data.object;
    const paymentId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.paymentId;
    const tripId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.tripId;
    const userId = (_c = session.metadata) === null || _c === void 0 ? void 0 : _c.userId;
    const mongoSession = yield mongoose_1.default.startSession();
    mongoSession.startTransaction();
    let booking;
    let trip;
    let payment;
    try {
        // PHASE 1 — DATABASE ONLY (fast)
        payment = yield payment_model_1.Payment.findById(paymentId).session(mongoSession);
        if (!payment)
            throw new AppError_1.default("Payment does not exist", 400);
        payment.status = booking_interface_1.IPaymentStatus.SUCCESS;
        payment.paymentGatewayData = session.payment_intent;
        yield payment.save({ session: mongoSession });
        booking = yield booking_model_1.Booking.findById(payment.booking)
            .populate("user")
            .session(mongoSession);
        if (!booking)
            throw new AppError_1.default("Booking does not exist", 400);
        booking.paymentStatus = booking_interface_1.IPaymentStatus.SUCCESS;
        yield booking.save({ session: mongoSession });
        trip = yield trip_model_1.Trip.findById(tripId).session(mongoSession);
        if (!trip)
            throw new AppError_1.default("Trip does not exist", 400);
        const participant = {
            user: new mongoose_1.default.Types.ObjectId(userId),
            paymentId,
            numberOfGuests: payment.totalPeople,
            joinedAt: new Date(),
        };
        trip.participants = [...((_d = trip.participants) !== null && _d !== void 0 ? _d : []), participant];
        yield trip.save({ session: mongoSession });
        // Commit only database operations
        yield mongoSession.commitTransaction();
    }
    catch (err) {
        yield mongoSession.abortTransaction();
        throw err;
    }
    finally {
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
    const pdfBuffer = yield (0, invoice_1.generatePdf)(invoiceData);
    // Upload to Cloudinary
    const cloudinaryResult = yield (0, cloudinary_config_1.uploadBufferToCloudinary)(pdfBuffer, "invoice");
    // Save invoice URL (simple atomic update)
    yield payment_model_1.Payment.findByIdAndUpdate(paymentId, {
        invoiceUrl: cloudinaryResult.secure_url,
    });
    // Send email
    yield (0, sendEmail_1.sendEmail)({
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
});
const getPaymentById = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield payment_model_1.Payment.findById(paymentId).populate("booking");
    let booking = yield booking_model_1.Booking.findById(payment === null || payment === void 0 ? void 0 : payment.booking).populate("trip").populate("user");
    const tripData = yield trip_model_1.Trip.findById(booking === null || booking === void 0 ? void 0 : booking.trip).populate("destination");
    // booking = {
    //   ...booking,
    //   trip: {
    //     ...booking!.trip,
    //     destination: tripData?.destination,
    //   },
    // };
    if (!payment)
        throw new AppError_1.default("Payment does not exist", 400);
    return { payment, booking };
});
exports.PaymentService = { createPayment, checkWebHook, getPaymentById };
