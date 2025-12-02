import AppError from "../../errorHelpers/AppError";
import { filterWithPagination } from "../../utils/filterWithPagination";
import { Destination } from "../destination/destination.model";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (payload: Partial<IReview>) => {
  const { destination } = payload;
  const isDestinationExists = await Destination.findById(destination);

  if (!isDestinationExists) throw new AppError("Destination does not exist", 400);

  const review = await Review.create(payload);

  isDestinationExists.reviews.push(review._id);

  await isDestinationExists.save();

  return review;
};

const getAllReviews = async (page: number, limit: number, destinationId: string) => {
  const reviews = await filterWithPagination(Review, { page, limit, filters: { destination: destinationId } });

  return reviews;
};

const getReview = async (id: string) => {
  const review = await Review.findById(id);
  return review;
};

const deleteReview = async (id: string) => {
  const review = await Review.findByIdAndDelete(id);
  return review;
};

const updateReview = async (id: string, payload: Partial<IReview>) => {
  const review = await Review.findByIdAndUpdate(id, payload, { new: true });
  return review;
};

export const ReviewService = { createReview, getAllReviews, getReview, deleteReview, updateReview };
