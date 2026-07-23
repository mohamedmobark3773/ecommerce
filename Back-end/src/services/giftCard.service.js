import BaseService from './base.service.js';
import { giftCardRepository } from '../repositories/giftCard.repository.js';

class GiftCardService extends BaseService {
  constructor() {
    super(giftCardRepository, 'gift card');
  }
}

export const giftCardService = new GiftCardService();
export default giftCardService;

