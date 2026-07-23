export class SubscriptionDTO {
  constructor(subscription) {
    this.id = subscription._id || subscription.id || null;
    this.user = subscription.user || null;
    this.plan = subscription.plan || 'basic';
    this.status = subscription.status || 'active';
    this.createdAt = subscription.createdAt || null;
    this.updatedAt = subscription.updatedAt || null;
  }

  static transform(subscription) {
    if (!subscription) return null;
    if (Array.isArray(subscription)) {
      return subscription.map((item) => new SubscriptionDTO(item));
    }
    return new SubscriptionDTO(subscription);
  }

  static toDatabase(data = {}) {
    return {
      user: data.user || undefined,
      plan: data.plan ? data.plan.trim().toLowerCase() : undefined,
      status: data.status ? data.status : undefined,
    };
  }
}

export default SubscriptionDTO;

