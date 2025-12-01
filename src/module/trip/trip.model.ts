import { ITrip } from "./trip.interface";
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema<ITrip>(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
        paymentId: {
          type: String,
          required: false,
        },
        numberOfGuests: {
          type: Number,
          required: false,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    isFull: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


tripSchema.pre("save", async function () {
  if (!this.participants) return;
  const totalGuests = this.participants.reduce(
    (sum, p) => sum + p.numberOfGuests,
    0
  );

  this.isFull = totalGuests >= this.capacity;
});



export const Trip = mongoose.model<ITrip>("Trip", tripSchema);
