export class RecommendationService {
  async getRecommendations(userId) {
    return { success: true, userId, data: [] };
  }
}

export const recommendationService = new RecommendationService();
export default recommendationService;

