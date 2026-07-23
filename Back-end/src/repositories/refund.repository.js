import BaseRepository from './base.repository.js';

class RefundRepository extends BaseRepository {
  constructor() {
    super('refund');
  }
}

export const refundRepository = new RefundRepository();
export default refundRepository;

