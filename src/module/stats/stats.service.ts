import { IPaymentStatus } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { Payment } from "../payment/payment.model";
import { Trip } from "../trip/trip.model";
import { IUserRole } from "../user/user.interface";
import { User } from "../user/user.model";

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
export const StatsService = { allStats };
