import { Types } from "mongoose";
import { IPaymentStatus } from "../booking/booking.interface";

export interface IPayment extends Document {
  booking: Types.ObjectId;
  paymentGatewayData?: any;
  totalPeople: number;
  amount: number;
  status: IPaymentStatus;
  invoiceUrl?: string;
  createdAt: Date;
}