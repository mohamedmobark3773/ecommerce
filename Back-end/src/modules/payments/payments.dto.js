export class PaymentDTO {
  constructor(payment) {
    this.id = payment._id;
    this.order = payment.order;
    this.user = payment.user;
    this.paymentMethod = payment.paymentMethod;
    this.amount = payment.amount;
    this.currency = payment.currency;
    this.transactionId = payment.transactionId;
    this.status = payment.status;
    this.meta = payment.meta || {};
    this.createdAt = payment.createdAt;
    this.updatedAt = payment.updatedAt;
  }

  static transform(payment) {
    if (!payment) return null;
    if (Array.isArray(payment)) {
      return payment.map((item) => new PaymentDTO(item));
    }
    return new PaymentDTO(payment);
  }

  static toDatabase(data) {
    return {
      order: data.order,
      user: data.user,
      paymentMethod: data.paymentMethod ? data.paymentMethod.toLowerCase() : undefined,
      amount: data.amount !== undefined ? Number(data.amount) : undefined,
      currency: data.currency ? data.currency.toUpperCase() : undefined,
      transactionId: data.transactionId ? data.transactionId.trim() : undefined,
      status: data.status,
      meta: data.meta || {},
    };
  }
}

