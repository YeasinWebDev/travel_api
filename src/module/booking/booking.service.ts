import AppError from "../../errorHelpers/AppError";
import { filterWithPagination } from "../../utils/filterWithPagination";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: Partial<IBooking>) => {
    const booking = await Booking.create(payload);
    return booking;
};

const getAllBookings = async (page: number, limit: number) => {
    const bookings = await filterWithPagination(Booking, { page: 1, limit: 10 });
    return bookings;
};

const getBooking = async (id: string) => {
    const booking = await Booking.findById(id).populate("trip");
    if (!booking) throw new AppError("Booking does not exist",400);
    return booking;
};

const deleteBooking = async (id: string) => {
    const booking = await Booking.findByIdAndDelete(id);
    return booking;
};

export const BookingService = {
    createBooking,
    getAllBookings,
    getBooking,
    deleteBooking,
};