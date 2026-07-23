import BaseRepository from './base.repository.js';

class LoyaltyRepository extends BaseRepository {
  constructor() {
    super('loyalty');
  }
}

export const loyaltyRepository = new LoyaltyRepository();
export default loyaltyRepository;

