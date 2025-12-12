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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const trip_service_1 = require("./trip.service");
const createTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield trip_service_1.TripService.createTrip(req.user, req.body, (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path);
        (0, sendResponse_1.sendResponse)(res, 200, "Trip created successfully", result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const addParticipant = (req, res, next) => {
    try {
        const result = trip_service_1.TripService.addParticipant(req.body, req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Participant added successfully", result);
    }
    catch (error) {
        next(error);
    }
};
const updateTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield trip_service_1.TripService.updateTrip(req.params.id, req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "Trip updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const deleteTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield trip_service_1.TripService.deleteTrip(req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Trip deleted successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getAllTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, trip, startDate, endDate } = req.query;
        const result = yield trip_service_1.TripService.getAllTrip(parseInt(page || "1"), parseInt(limit || "5"), trip, startDate, endDate);
        (0, sendResponse_1.sendResponse)(res, 200, "Trip fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getTrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield trip_service_1.TripService.getTrip(req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Trip fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const updateTripStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield trip_service_1.TripService.updateTripStatus(req.params.id, req.body.status);
        (0, sendResponse_1.sendResponse)(res, 200, "Trip status updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getMyTrips = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, trip: search, startDate, endDate } = req.query;
        const result = yield trip_service_1.TripService.getMyTrips(req.user, parseInt(page || "1"), parseInt(limit || "5"), search, startDate, endDate);
        (0, sendResponse_1.sendResponse)(res, 200, "Trip fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.TripController = { createTrip, addParticipant, updateTrip, deleteTrip, getAllTrip, getTrip, updateTripStatus, getMyTrips };
