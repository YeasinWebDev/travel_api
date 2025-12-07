"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_interface_1 = require("../booking/booking.interface");
const paymentSchema = new mongoose_1.default.Schema({
    booking: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    paymentGatewayData: Object,
    amount: {
        type: Number,
        required: true,
    },
    totalPeople: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: booking_interface_1.IPaymentStatus,
        default: booking_interface_1.IPaymentStatus.PENDING,
    },
    invoiceUrl: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false,
});
exports.Payment = mongoose_1.default.model("Payment", paymentSchema);
