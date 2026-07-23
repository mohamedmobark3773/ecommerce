export class RecommendationDTO {
  constructor(recommendation) {
    this.id = recommendation._id || recommendation.id || null;
    this.user = recommendation.user || null;
    this.product = recommendation.product || null;
    this.score = recommendation.score || 0;
    this.reason = recommendation.reason || '';
    this.createdAt = recommendation.createdAt || null;
    this.updatedAt = recommendation.updatedAt || null;
  }

  static transform(recommendation) {
    if (!recommendation) return null;
    if (Array.isArray(recommendation)) {
      return recommendation.map((item) => new RecommendationDTO(item));
    }
    return new RecommendationDTO(recommendation);
  }

  static toDatabase(data = {}) {
    return {
      user: data.user || undefined,
      product: data.product || undefined,
      score: typeof data.score === 'number' ? data.score : undefined,
      reason: data.reason ? data.reason.trim() : undefined,
    };
  }
}

export default RecommendationDTO;

