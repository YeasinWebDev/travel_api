import { Types } from "mongoose";
 
export interface IPrecipitants {
  user: Types.ObjectId;
  paymentId: string;
  numberOfGuests: number;
  joinedAt: Date;
}

export interface ITrip extends Document {
  title: string;
  creator: Types.ObjectId;
  destination: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  capacity: number;
  participants?: IPrecipitants[];
  isFull?: boolean;
  status?: "active" | "completed" | "cancelled";
}
