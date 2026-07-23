export class WalletDTO {
  constructor(wallet) {
    this.id = wallet._id || wallet.id || null;
    this.user = wallet.user || null;
    this.balance = wallet.balance || 0;
    this.currency = wallet.currency || 'USD';
    this.createdAt = wallet.createdAt || null;
    this.updatedAt = wallet.updatedAt || null;
  }

  static transform(wallet) {
    if (!wallet) return null;
    if (Array.isArray(wallet)) {
      return wallet.map((item) => new WalletDTO(item));
    }
    return new WalletDTO(wallet);
  }

  static toDatabase(data = {}) {
    return {
      user: data.user || undefined,
      balance: typeof data.balance === 'number' ? data.balance : undefined,
      currency: data.currency ? data.currency.trim().toUpperCase() : undefined,
    };
  }
}

export default WalletDTO;

