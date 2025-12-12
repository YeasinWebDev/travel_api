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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = exports.getTopUsers = void 0;
const booking_interface_1 = require("../booking/booking.interface");
const booking_model_1 = require("../booking/booking.model");
const payment_model_1 = require("../payment/payment.model");
const trip_model_1 = require("../trip/trip.model");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const getTopUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.aggregate([
        {
            $lookup: {
                from: "payments",
                localField: "_id",
                foreignField: "booking",
                as: "payments",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userInfo",
            },
        },
        { $unwind: "$userInfo" },
        {
            $match: {
                "payments.status": booking_interface_1.IPaymentStatus.SUCCESS,
            },
        },
        {
            $group: {
                _id: "$userInfo._id",
                name: { $first: "$userInfo.name" },
                email: { $first: "$userInfo.email" },
                profileImage: { $first: "$userInfo.profileImage" },
                trips: { $sum: 1 },
                revenue: { $sum: { $sum: "$payments.amount" } },
            },
        },
        {
            $sort: {
                revenue: -1,
            },
        },
        { $limit: 5 },
    ]);
    return result.map((user) => ({
        name: user.name,
        email: user.email,
        avatar: user.profileImage,
        trips: user.trips,
        revenue: `${user.revenue}`,
    }));
});
exports.getTopUsers = getTopUsers;
// stats for admin
const allStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllPayments = yield payment_model_1.Payment.find({ status: booking_interface_1.IPaymentStatus.SUCCESS });
    const getAllBookings = yield booking_model_1.Booking.find();
    const trips = yield trip_model_1.Trip.find();
    const users = yield user_model_1.User.find({ role: user_interface_1.IUserRole.USER });
    const stats = {
        totalRevenue: getAllPayments.reduce((acc, payment) => acc + payment.amount, 0),
        totalBookings: getAllBookings.length,
        totalTrips: trips.length,
        totalUsers: users.length,
    };
    const result = yield payment_model_1.Payment.aggregate([
        {
            $match: {
                status: booking_interface_1.IPaymentStatus.SUCCESS,
            },
        },
        {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                revenue: { $sum: "$amount" },
                bookings: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                monthNumber: "$_id.month",
                revenue: 1,
                bookings: 1,
            },
        },
        {
            $sort: {
                monthNumber: 1,
            },
        },
    ]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const statsByMonth = result.map((item) => ({
        month: monthNames[item.monthNumber - 1],
        revenue: item.revenue,
        bookings: item.bookings,
    }));
    const topUsers = yield (0, exports.getTopUsers)();
    return { stats, statsByMonth, topUsers };
});
// stats for user
const allStatsForUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllBookings = yield booking_model_1.Booking.find({ user: user.userId });
    const trips = yield trip_model_1.Trip.find({ creator: user.userId });
    const payments = yield payment_model_1.Payment.aggregate([
        {
            $match: {
                booking: { $in: getAllBookings.map((booking) => booking._id) },
                status: booking_interface_1.IPaymentStatus.SUCCESS,
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$amount" },
                totalBookings: { $sum: 1 },
            },
        },
    ]);
    const stats = {
        totalBookings: getAllBookings.length,
        totalTrips: trips.length,
        totalRevenue: payments.length ? payments[0].totalRevenue : 0,
    };
    // stats by month
    const result = yield payment_model_1.Payment.aggregate([
        {
            $match: {
                booking: { $in: getAllBookings.map((booking) => booking._id) },
                status: booking_interface_1.IPaymentStatus.SUCCESS,
            },
        },
        {
            $group: {
                _id: { month: { $month: "$createdAt" } },
                revenue: { $sum: "$amount" },
                bookings: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                monthNumber: "$_id.month",
                revenue: 1,
                bookings: 1,
            },
        },
        {
            $sort: {
                monthNumber: 1,
            },
        },
    ]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const statsByMonth = result.map((item) => ({
        month: monthNames[item.monthNumber - 1],
        revenue: item.revenue,
        bookings: item.bookings,
    }));
    const bookingData = [
        { name: "Booked", value: getAllBookings.filter((booking) => booking.bookingStatus === booking_interface_1.IBookingStatus.BOOKED).length },
        { name: "Cancelled", value: getAllBookings.filter((booking) => booking.bookingStatus === booking_interface_1.IBookingStatus.CANCELLED).length },
    ];
    return { stats, statsByMonth, bookingData };
});
exports.StatsService = { allStats, allStatsForUser };
