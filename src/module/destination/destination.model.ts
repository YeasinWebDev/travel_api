import { IDestination } from "./destination.interface";
import mongoose, { Types } from "mongoose";

const destinationSchema = new mongoose.Schema<IDestination>(
  {
    name: {
      type: String,
      required: true,
    },
    division: {
      type: Types.ObjectId,
      ref: "Division",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    price:{
      type: Number,
      required: true,
    },
    bestTimeToVisit:{
      type: String,
      required: true,
    },
    activities:{
      type: [String],
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    coordinates: {
      lat: {
        type: Number,
        required: false,
      },
      lng: {
        type: Number,
        required: false,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Destination = mongoose.model<IDestination>("Destination", destinationSchema);
