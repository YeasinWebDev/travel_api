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
exports.DestinationService = exports.updateDestination = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const fileUploder_1 = require("../../helpers/fileUploder");
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
const updateDestination = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield destination_model_1.Destination.findById(id);
    if (!existing)
        throw new AppError_1.default("Destination does not exist", 400);
    // New images coming from payload
    const newImages = payload.image || [];
    // Existing images from DB
    const oldImages = existing.image || [];
    // Identify which images were removed by user
    const removedImages = oldImages.filter(img => !newImages.includes(img));
    // Delete removed images from Cloudinary
    if (removedImages.length > 0) {
        yield (0, fileUploder_1.deleteMultipleCloudinaryImages)(removedImages);
    }
    // Final images list (user keeps some + adds new)
    const finalImages = newImages;
    const updatePayload = Object.assign(Object.assign({}, payload), { image: finalImages });
    const updated = yield destination_model_1.Destination.findByIdAndUpdate(id, updatePayload, { new: true });
    return updated;
});
exports.updateDestination = updateDestination;
const deleteDestination = (id) => {
    const isExists = destination_model_1.Destination.findById(id);
    if (!isExists)
        throw new AppError_1.default("Destination does not exist", 400);
    const destination = destination_model_1.Destination.findByIdAndDelete(id);
    return destination;
};
exports.DestinationService = { createDestination, getAllDestinations, getDestination, updateDestination: exports.updateDestination, deleteDestination };
