"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_interface_1 = require("./booking.interface");
const bookingSchema = new mongoose_1.default.Schema({
    trip: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: booking_interface_1.IPaymentStatus,
        default: booking_interface_1.IPaymentStatus.PENDING,
    },
    bookingStatus: {
        type: String,
        enum: booking_interface_1.IBookingStatus,
        default: booking_interface_1.IBookingStatus.BOOKED,
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.Booking = mongoose_1.default.model("Booking", bookingSchema);
