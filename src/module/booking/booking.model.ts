import mongoose from "mongoose";
import { IBooking, IBookingStatus, IPaymentStatus } from "./booking.interface";

const bookingSchema = new mongoose.Schema<IBooking>({
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: IPaymentStatus,
        default: IPaymentStatus.PENDING,
    },
    bookingStatus: {
        type: String,
        enum: IBookingStatus,
        default: IBookingStatus.BOOKED,
    }
},{
    timestamps: true,
    versionKey: false
})

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);