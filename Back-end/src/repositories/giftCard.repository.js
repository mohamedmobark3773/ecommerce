import BaseRepository from './base.repository.js';

class GiftCardRepository extends BaseRepository {
  constructor() {
    super('giftCard');
  }
}

export const giftCardRepository = new GiftCardRepository();
export default giftCardRepository;

