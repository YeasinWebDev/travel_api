import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await ReviewService.createReview(req.body);
        sendResponse(res, 200, "Review created successfully", result);
    } catch (error) {
        next(error);
    }
}

const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await ReviewService.getReview(req.params.id);
        sendResponse(res, 200, "Review fetched successfully", result);
    } catch (error) {
        next(error);
    }
}

const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await ReviewService.getAllReviews( parseInt(req.params.page), parseInt(req.params.limit), req.params.destinationId);
        sendResponse(res, 200, "Reviews fetched successfully", result);
    } catch (error) {
        next(error);
    }
}

const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await ReviewService.deleteReview(req.params.id);
        sendResponse(res, 200, "Review deleted successfully", result);
    } catch (error) {
        next(error);
    }
}

const updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await ReviewService.updateReview(req.params.id, req.body);
        sendResponse(res, 200, "Review updated successfully", result);
    } catch (error) {
        next(error);
    }
}

export const ReviewController = { createReview, getReview, getAllReviews, deleteReview, updateReview };