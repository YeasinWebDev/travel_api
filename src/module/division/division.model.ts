import mongoose from "mongoose";
import { IDivision } from "./division.interface";

const divisionSchema = new mongoose.Schema<IDivision>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Division = mongoose.model<IDivision>("Division", divisionSchema);