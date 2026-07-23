import BaseRepository from './base.repository.js';

class TransactionRepository extends BaseRepository {
  constructor() {
    super('transaction');
  }
}

export const transactionRepository = new TransactionRepository();
export default transactionRepository;

