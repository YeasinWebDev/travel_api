"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const filterWithPagination_1 = require("../../utils/filterWithPagination");
const destination_model_1 = require("./destination.model");
const createDestination = (payload) => {
    const destination = destination_model_1.Destination.create(payload);
    return destination;
};
const getAllDestinations = (page, limit, search, division, bestTimeToVisit) => {
    return (0, filterWithPagination_1.filterWithPagination)(destination_model_1.Destination, {
        page,
        limit,
        search,
        searchFields: ["name"],
        populate: ["division"],
        filters: { division, bestTimeToVisit },
    });
};
const getDestination = (id) => {
    const isExists = destination_model_1.Destination.findById(id);
    if (!isExists)
        throw new AppError_1.default("Destination does not exist", 400);
    const destination = destination_model_1.Destination.findById(id);
    return destination;
};
const updateDestination = (id, payload) => {
    const isExists = destination_model_1.Destination.findById(id);
    if (!isExists)
        throw new AppError_1.default("Destination does not exist", 400);
    const destination = destination_model_1.Destination.findByIdAndUpdate(id, payload, { new: true });
    return destination;
};
const deleteDestination = (id) => {
    const isExists = destination_model_1.Destination.findById(id);
    if (!isExists)
        throw new AppError_1.default("Destination does not exist", 400);
    const destination = destination_model_1.Destination.findByIdAndDelete(id);
    return destination;
};
exports.DestinationService = { createDestination, getAllDestinations, getDestination, updateDestination, deleteDestination };
