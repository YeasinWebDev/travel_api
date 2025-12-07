import { Types } from "mongoose";

export enum IPaymentStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}

export enum IBookingStatus {
    BOOKED = "BOOKED",
    CANCELLED = "CANCELLED",
}
export interface IBooking extends Document {
  trip: Types.ObjectId;
  user: Types.ObjectId;
  numberOfGuests: number;
  amount: number;
  paymentStatus: IPaymentStatus;
  bookingStatus: IBookingStatus;
  createdAt: Date;
}