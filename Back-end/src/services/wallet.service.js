import BaseService from './base.service.js';
import { walletRepository } from '../repositories/wallet.repository.js';

class WalletService extends BaseService {
  constructor() {
    super(walletRepository, 'wallet');
  }
}

export const walletService = new WalletService();
export default walletService;

