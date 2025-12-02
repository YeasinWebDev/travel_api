import { Router } from "express";
import { ReviewController } from "./review.controller";

export const reviewRouter =Router()

reviewRouter.get("/" , ReviewController.getAllReviews)
reviewRouter.get("/:id" , ReviewController.getReview)
reviewRouter.post("/create" , ReviewController.createReview)
reviewRouter.patch("/:id" , ReviewController.updateReview)
reviewRouter.delete("/:id" , ReviewController.deleteReview)