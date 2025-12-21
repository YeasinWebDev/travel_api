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
exports.ReviewService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const filterWithPagination_1 = require("../../utils/filterWithPagination");
const destination_model_1 = require("../destination/destination.model");
const review_model_1 = require("./review.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createReview = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        throw new AppError_1.default("User not found", 400);
    const { destination } = payload;
    const isDestinationExists = yield destination_model_1.Destination.findById(destination);
    if (!isDestinationExists)
        throw new AppError_1.default("Destination does not exist", 400);
    const review = yield review_model_1.Review.create(Object.assign(Object.assign({}, payload), { user: user.userId }));
    isDestinationExists.reviews.push(review._id);
    yield isDestinationExists.save();
    return review;
});
const getAllReviews = (page, limit, destinationId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(destinationId);
    const reviews = yield (0, filterWithPagination_1.filterWithPagination)(review_model_1.Review, { page, limit, filters: { destination: destinationId }, populate: ["user"] });
    return reviews;
});
const getReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findById(id).populate("user");
    return review;
});
const getMyReviews = (userId, page, limit, destinationId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield (0, filterWithPagination_1.filterWithPagination)(review_model_1.Review, {
        page,
        limit,
        filters: { user: new mongoose_1.default.Types.ObjectId(userId), destination: destinationId },
        populate: ["destination"],
    });
    return reviews;
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findByIdAndDelete(id);
    return review;
});
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findByIdAndUpdate(id, payload, { new: true });
    return review;
});
exports.ReviewService = { createReview, getAllReviews, getReview, deleteReview, updateReview, getMyReviews };
