import { Types } from "mongoose";

export interface IReview extends Document {
  user: Types.ObjectId;
  destination: Types.ObjectId;
  rating: number;
  comment?: string;
}