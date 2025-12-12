import { JwtPayload } from "jsonwebtoken";
import { IBookingStatus, IPaymentStatus } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { Payment } from "../payment/payment.model";
import { Trip } from "../trip/trip.model";
import { IUserRole } from "../user/user.interface";
import { User } from "../user/user.model";

export const getTopUsers = async () => {
  const result = await Booking.aggregate([
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
        "payments.status": IPaymentStatus.SUCCESS,
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
};

// stats for admin
const allStats = async () => {
  const getAllPayments = await Payment.find({ status: IPaymentStatus.SUCCESS });
  const getAllBookings = await Booking.find();
  const trips = await Trip.find();
  const users = await User.find({ role: IUserRole.USER });
  const stats = {
    totalRevenue: getAllPayments.reduce((acc, payment) => acc + payment.amount, 0),
    totalBookings: getAllBookings.length,
    totalTrips: trips.length,
    totalUsers: users.length,
  };

  const result = await Payment.aggregate([
    {
      $match: {
        status: IPaymentStatus.SUCCESS,
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

  const topUsers = await getTopUsers();

  return { stats, statsByMonth, topUsers };
};

// stats for user

const allStatsForUser = async (user: JwtPayload) => {
  const getAllBookings = await Booking.find({ user: user.userId });
  const trips = await Trip.find({ creator: user.userId });
  const payments = await Payment.aggregate([
    {
      $match: {
        booking: { $in: getAllBookings.map((booking) => booking._id) },
        status: IPaymentStatus.SUCCESS,
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
  const result = await Payment.aggregate([
    {
      $match: {
        booking: { $in: getAllBookings.map((booking) => booking._id) },
        status: IPaymentStatus.SUCCESS,
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
    { name: "Booked", value: getAllBookings.filter((booking) => booking.bookingStatus === IBookingStatus.BOOKED).length },
    { name: "Cancelled", value: getAllBookings.filter((booking) => booking.bookingStatus === IBookingStatus.CANCELLED).length },
  ];



  return { stats, statsByMonth , bookingData };
};

export const StatsService = { allStats, allStatsForUser };
