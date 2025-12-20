import { Router } from "express";
import { ReviewController } from "./review.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";

export const reviewRouter = Router();

reviewRouter.get("/", ReviewController.getAllReviews);
reviewRouter.get("/myReviews", checkAuth(IUserRole.USER, IUserRole.ADMIN), ReviewController.getMyReviews);
reviewRouter.get("/:id", ReviewController.getReview);
reviewRouter.post("/create", checkAuth(IUserRole.USER, IUserRole.ADMIN), ReviewController.createReview);
reviewRouter.patch("/:id", ReviewController.updateReview);
reviewRouter.delete("/:id", ReviewController.deleteReview);
