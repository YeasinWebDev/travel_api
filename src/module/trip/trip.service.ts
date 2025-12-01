import { Types } from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { IPrecipitants, ITrip } from "./trip.interface";
import { Trip } from "./trip.model";
import { filterWithPagination } from "../../utils/filterWithPagination";

const createTrip = async (payload: Partial<ITrip>) => {
  const { startDate, endDate, creator } = payload;

  const isTripExists = await Trip.findOne({ creator, startDate, endDate });
  if (isTripExists) throw new AppError("Trip already exist in that date", 400);

  const trip = Trip.create(payload);
  return trip;
};

const addParticipant = async (payload: IPrecipitants, tripId: string) => {
  // const trip = await Trip.findById(tripId);
  // if (!trip) throw new AppError("Trip does not exist", 400);

  // const participant = { user: new Types.ObjectId(payload.user), paymentId: payload.paymentId, numberOfGuests: payload.numberOfGuests, joinedAt: new Date() };

  // if (trip.isFull) throw new AppError("Trip is full", 400);

  // let totalGuests = 0;
  
  // trip.participants.forEach((participant) => {
  //   totalGuests += participant.numberOfGuests;
  // });

  // if (totalGuests + payload.numberOfGuests > trip.capacity) {
  //   throw new AppError(`Trip can't have ${payload.numberOfGuests} guests . Only ${trip.capacity - totalGuests} seats left`, 400);
  // }

  // trip.participants.push(participant);

  // const updatedTrip = await trip.save();
  return true;
};

const updateTrip = async (tripId: string, payload: Partial<ITrip>) => {
  const isExists = Trip.findById(tripId);
  if (!isExists) throw new AppError("Trip does not exist", 400);
  const trip = Trip.findByIdAndUpdate(tripId, payload, { new: true });
  return trip;
};

const deleteTrip = async (tripId: string) => {
  const isExists = Trip.findById(tripId);
  if (!isExists) throw new AppError("Trip does not exist", 400);
  const trip = Trip.findByIdAndDelete(tripId);
  return trip;
};

const getAllTrip = async (page: number, limit: number, search: string) => {
  const trips = await filterWithPagination(Trip, { page, limit, search, searchFields: ["title"] });
  return trips;
};

const getTrip = async (tripId: string) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new AppError("Trip does not exist", 400);
  return trip;
};

export const TripService = { createTrip, addParticipant, updateTrip, deleteTrip, getAllTrip, getTrip };
