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
exports.BookingService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const filterWithPagination_1 = require("../../utils/filterWithPagination");
const payment_service_1 = require("../payment/payment.service");
const booking_model_1 = require("./booking.model");
const createBooking = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.create(payload);
    const paymentPayload = { booking: booking._id, totalPeople: payload.numberOfGuests, amount: payload.amount };
    const payment = yield payment_service_1.PaymentService.createPayment(paymentPayload, user);
    return payment;
});
const getAllBookings = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield (0, filterWithPagination_1.filterWithPagination)(booking_model_1.Booking, { page: 1, limit: 10 });
    return bookings;
});
const getBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(id).populate("trip");
    if (!booking)
        throw new AppError_1.default("Booking does not exist", 400);
    return booking;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findByIdAndDelete(id);
    return booking;
});
exports.BookingService = {
    createBooking,
    getAllBookings,
    getBooking,
    deleteBooking,
};
