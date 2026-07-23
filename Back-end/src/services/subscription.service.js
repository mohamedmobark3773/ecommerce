import BaseService from './base.service.js';
import { subscriptionRepository } from '../repositories/subscription.repository.js';

class SubscriptionService extends BaseService {
  constructor() {
    super(subscriptionRepository, 'subscription');
  }
}

export const subscriptionService = new SubscriptionService();
export default subscriptionService;

