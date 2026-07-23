export class GiftCardDTO {
  constructor(giftCard) {
    this.id = giftCard._id || giftCard.id || null;
    this.code = giftCard.code || '';
    this.balance = giftCard.balance || 0;
    this.currency = giftCard.currency || 'USD';
    this.isActive = typeof giftCard.isActive === 'boolean' ? giftCard.isActive : true;
    this.createdAt = giftCard.createdAt || null;
    this.updatedAt = giftCard.updatedAt || null;
  }

  static transform(giftCard) {
    if (!giftCard) return null;
    if (Array.isArray(giftCard)) {
      return giftCard.map((item) => new GiftCardDTO(item));
    }
    return new GiftCardDTO(giftCard);
  }

  static toDatabase(data = {}) {
    return {
      code: data.code ? data.code.trim().toUpperCase() : undefined,
      balance: typeof data.balance === 'number' ? data.balance : undefined,
      currency: data.currency ? data.currency.trim().toUpperCase() : undefined,
      isActive: typeof data.isActive === 'boolean' ? data.isActive : undefined,
    };
  }
}

export default GiftCardDTO;

