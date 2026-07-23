export class ReviewDTO {
  constructor(review) {
    this.id = review._id;
    this.user = review.user;
    this.product = review.product;
    this.rating = review.rating;
    this.title = review.title;
    this.comment = review.comment;
    this.isApproved = review.isApproved;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }

  static transform(review) {
    if (!review) return null;
    if (Array.isArray(review)) {
      return review.map((item) => new ReviewDTO(item));
    }
    return new ReviewDTO(review);
  }

  static toDatabase(data) {
    return {
      user: data.user,
      product: data.product,
      rating: data.rating !== undefined ? Number(data.rating) : undefined,
      title: data.title ? data.title.trim() : undefined,
      comment: data.comment ? data.comment.trim() : undefined,
      isApproved: data.isApproved !== undefined ? !!data.isApproved : undefined,
    };
  }
}

