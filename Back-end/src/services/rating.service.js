export class RatingService {
  async createRating(payload = {}) {
    return { success: true, message: 'Rating submitted.', payload };
  }
}

export const ratingService = new RatingService();
export default ratingService;

