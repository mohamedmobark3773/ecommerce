import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { reviewsService } from "./reviews.service.js";

export const createReview = asyncHandler(async (req, res) => {
  const review = await reviewsService.createReview({ ...req.body, user: req.body.user || req.user?._id });

  return res.status(201).json({
    success: true,
    message: "Review created successfully.",
    data: review,
  });
});

export const getReviews = asyncHandler(async (req, res) => {
  const result = await reviewsService.getReviews(req.query);

  return res.status(200).json({
    success: true,
    message: "Reviews retrieved successfully.",
    data: result,
  });
});

export const getReviewById = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await reviewsService.getReviewById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Review retrieved successfully.",
    data: review,
  });
});

export const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await reviewsService.updateReview(reviewId, req.body);

  if (!review) {
    throw new ApiError(404, "Review not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Review updated successfully.",
    data: review,
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await reviewsService.deleteReview(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
    data: review,
  });
});

