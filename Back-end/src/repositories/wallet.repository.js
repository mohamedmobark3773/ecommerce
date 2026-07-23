import BaseRepository from './base.repository.js';

class WalletRepository extends BaseRepository {
  constructor() {
    super('wallet');
  }
}

export const walletRepository = new WalletRepository();
export default walletRepository;

