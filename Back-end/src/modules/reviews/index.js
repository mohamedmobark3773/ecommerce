export { default as reviewsRouter } from "./reviews.routes.js";
export { createReview, getReviews, getReviewById, updateReview, deleteReview } from "./reviews.controller.js";
export { reviewsService } from "./reviews.service.js";
export { reviewsRepository } from "./reviews.repository.js";
export { Review } from "./reviews.model.js";
export { ReviewDTO } from "./reviews.dto.js";
export { createReviewSchema, updateReviewSchema } from "./reviews.schema.js";
export { createReviewValidator, updateReviewValidator, reviewIdValidator } from "./reviews.validator.js";

