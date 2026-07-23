import { reviewsRepository } from "./reviews.repository.js";
import { ReviewDTO } from "./reviews.dto.js";

class ReviewsService {
  async createReview(reviewData) {
    const formattedData = ReviewDTO.toDatabase(reviewData);
    const review = await reviewsRepository.create(formattedData);
    return ReviewDTO.transform(review);
  }

  async getReviews(query = {}) {
    const filter = {};
    const options = {};

    if (query.user) filter.user = query.user;
    if (query.product) filter.product = query.product;
    if (query.rating) filter.rating = Number(query.rating);
    if (query.isApproved !== undefined) {
      filter.isApproved = query.isApproved === "true" || query.isApproved === true;
    }

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await reviewsRepository.findAll(filter, options);
    return {
      ...result,
      reviews: ReviewDTO.transform(result.reviews),
    };
  }

  async getReviewById(reviewId) {
    const review = await reviewsRepository.findById(reviewId);
    return ReviewDTO.transform(review);
  }

  async updateReview(reviewId, reviewData) {
    const formattedData = ReviewDTO.toDatabase(reviewData);
    const review = await reviewsRepository.update(reviewId, formattedData);
    return ReviewDTO.transform(review);
  }

  async deleteReview(reviewId) {
    const review = await reviewsRepository.delete(reviewId);
    return ReviewDTO.transform(review);
  }
}

export const reviewsService = new ReviewsService();

