import BaseRepository from './base.repository.js';

class SubscriptionRepository extends BaseRepository {
  constructor() {
    super('subscription');
  }
}

export const subscriptionRepository = new SubscriptionRepository();
export default subscriptionRepository;

