import { Review } from "./reviews.model.js";

class ReviewsRepository {
  async create(reviewData) {
    return await Review.create(reviewData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find(filter).sort(sort).skip(skip).limit(limit).populate("user product"),
      Review.countDocuments(filter),
    ]);

    return {
      reviews,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(reviewId) {
    return await Review.findById(reviewId).populate("user product");
  }

  async update(reviewId, reviewData) {
    return await Review.findByIdAndUpdate(reviewId, { $set: reviewData }, { new: true, runValidators: true }).populate("user product");
  }

  async delete(reviewId) {
    return await Review.findByIdAndDelete(reviewId);
  }
}

export const reviewsRepository = new ReviewsRepository();

