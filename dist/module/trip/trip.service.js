"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const trip_model_1 = require("./trip.model");
const filterWithPagination_1 = require("../../utils/filterWithPagination");
const createTrip = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, creator } = payload;
    const isTripExists = yield trip_model_1.Trip.findOne({ creator, startDate, endDate });
    if (isTripExists)
        throw new AppError_1.default("Trip already exist in that date", 400);
    const trip = yield trip_model_1.Trip.create(payload);
    return trip;
});
const addParticipant = (payload, tripId) => __awaiter(void 0, void 0, void 0, function* () {
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
});
const updateTrip = (tripId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = trip_model_1.Trip.findById(tripId);
    if (!isExists)
        throw new AppError_1.default("Trip does not exist", 400);
    const trip = trip_model_1.Trip.findByIdAndUpdate(tripId, payload, { new: true });
    return trip;
});
const deleteTrip = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = trip_model_1.Trip.findById(tripId);
    if (!isExists)
        throw new AppError_1.default("Trip does not exist", 400);
    const trip = trip_model_1.Trip.findByIdAndDelete(tripId);
    return trip;
});
const getAllTrip = (page, limit, search) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield (0, filterWithPagination_1.filterWithPagination)(trip_model_1.Trip, { page, limit, search, searchFields: ["title"] });
    return trips;
});
const getTrip = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield trip_model_1.Trip.findById(tripId);
    if (!trip)
        throw new AppError_1.default("Trip does not exist", 400);
    return trip;
});
exports.TripService = { createTrip, addParticipant, updateTrip, deleteTrip, getAllTrip, getTrip };
