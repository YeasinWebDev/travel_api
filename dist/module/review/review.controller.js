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
exports.ReviewController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const review_service_1 = require("./review.service");
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.ReviewService.createReview(req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "Review created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.ReviewService.getReview(req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Review fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getAllReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.ReviewService.getAllReviews(parseInt(req.params.page), parseInt(req.params.limit), req.params.destinationId);
        (0, sendResponse_1.sendResponse)(res, 200, "Reviews fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.ReviewService.deleteReview(req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Review deleted successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.ReviewService.updateReview(req.params.id, req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "Review updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.ReviewController = { createReview, getReview, getAllReviews, deleteReview, updateReview };
