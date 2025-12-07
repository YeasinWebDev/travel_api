import mongoose from "mongoose";
import { IPayment } from "./payment.interface";
import { IPaymentStatus } from "../booking/booking.interface";

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
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
      enum: IPaymentStatus,
      default: IPaymentStatus.PENDING,
    },
    invoiceUrl:{
      type: String,
      required:false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
