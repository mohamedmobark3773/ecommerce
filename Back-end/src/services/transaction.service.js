import BaseService from './base.service.js';
import { transactionRepository } from '../repositories/transaction.repository.js';

class TransactionService extends BaseService {
  constructor() {
    super(transactionRepository, 'transaction');
  }
}

export const transactionService = new TransactionService();
export default transactionService;

