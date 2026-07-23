export class RefundDTO {
  constructor(refund) {
    this.id = refund._id || refund.id || null;
    this.orderId = refund.orderId || null;
    this.reason = refund.reason || '';
    this.amount = refund.amount || 0;
    this.status = refund.status || 'pending';
    this.createdAt = refund.createdAt || null;
    this.updatedAt = refund.updatedAt || null;
  }

  static transform(refund) {
    if (!refund) return null;
    if (Array.isArray(refund)) {
      return refund.map((item) => new RefundDTO(item));
    }
    return new RefundDTO(refund);
  }

  static toDatabase(data = {}) {
    return {
      orderId: data.orderId || undefined,
      reason: data.reason ? data.reason.trim() : undefined,
      amount: typeof data.amount === 'number' ? data.amount : undefined,
      status: data.status ? data.status : undefined,
    };
  }
}

export default RefundDTO;

