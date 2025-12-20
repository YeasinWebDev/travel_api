import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { filterWithPagination } from "../../utils/filterWithPagination";
import { Destination } from "../destination/destination.model";
import { IReview } from "./review.interface";
import { Review } from "./review.model";
import mongoose from "mongoose";

const createReview = async (payload: Partial<IReview>, user: JwtPayload) => {
  if (!user) throw new AppError("User not found", 400);
  const { destination } = payload;
  const isDestinationExists = await Destination.findById(destination);

  if (!isDestinationExists) throw new AppError("Destination does not exist", 400);

  const review = await Review.create({ ...payload, user: user.userId });

  isDestinationExists.reviews.push(review._id);

  await isDestinationExists.save();

  return review;
};

const getAllReviews = async (page: number, limit: number, destinationId: string) => {
  console.log(destinationId);
  const reviews = await filterWithPagination(Review, { page, limit, filters: { destination: destinationId }, populate: ["user"] });

  return reviews;
};

const getReview = async (id: string) => {
  const review = await Review.findById(id).populate("user");
  return review;
};

const getMyReviews = async (userId: string, page: number, limit: number, destinationId: string) => {
  const reviews = await filterWithPagination(Review, {
    page,
    limit,
    filters: { user: new mongoose.Types.ObjectId(userId), destination: destinationId },
    populate: ["destination"],
  });
  return reviews;
};

const deleteReview = async (id: string) => {
  const review = await Review.findByIdAndDelete(id);
  return review;
};

const updateReview = async (id: string, payload: Partial<IReview>) => {
  const review = await Review.findByIdAndUpdate(id, payload, { new: true });
  return review;
};

export const ReviewService = { createReview, getAllReviews, getReview, deleteReview, updateReview, getMyReviews };
