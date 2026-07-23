import { Router } from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "./reviews.controller.js";
import { createReviewValidator, updateReviewValidator, reviewIdValidator } from "./reviews.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createReviewValidator, validate, createReview)
  .get(getReviews);

router.route("/:reviewId")
  .get(reviewIdValidator, getReviewById)
  .put(reviewIdValidator, updateReviewValidator, validate, updateReview)
  .delete(reviewIdValidator, deleteReview);

export default router;

