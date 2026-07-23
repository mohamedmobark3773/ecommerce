import BaseService from './base.service.js';
import { loyaltyRepository } from '../repositories/loyalty.repository.js';

class LoyaltyService extends BaseService {
  constructor() {
    super(loyaltyRepository, 'loyalty');
  }
}

export const loyaltyService = new LoyaltyService();
export default loyaltyService;

