export class OrderDTO {
  constructor(order) {
    this.id = order._id;
    this.user = order.user;
    this.orderNumber = order.orderNumber;
    this.status = order.status;
    this.paymentStatus = order.paymentStatus;
    this.shippingAddress = order.shippingAddress;
    this.billingAddress = order.billingAddress;
    this.shippingMethod = order.shippingMethod;
    this.items = order.items || [];
    this.subtotal = order.subtotal;
    this.taxAmount = order.taxAmount;
    this.shippingAmount = order.shippingAmount;
    this.discountAmount = order.discountAmount;
    this.totalAmount = order.totalAmount;
    this.currency = order.currency;
    this.notes = order.notes;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }

  static transform(order) {
    if (!order) return null;
    if (Array.isArray(order)) {
      return order.map((item) => new OrderDTO(item));
    }
    return new OrderDTO(order);
  }

  static toDatabase(data) {
    return {
      user: data.user,
      orderNumber: data.orderNumber ? data.orderNumber.trim() : undefined,
      status: data.status,
      paymentStatus: data.paymentStatus,
      shippingAddress: data.shippingAddress || null,
      billingAddress: data.billingAddress || null,
      shippingMethod: data.shippingMethod ? data.shippingMethod.trim() : undefined,
      items: data.items || [],
      subtotal: data.subtotal !== undefined ? Number(data.subtotal) : undefined,
      taxAmount: data.taxAmount !== undefined ? Number(data.taxAmount) : undefined,
      shippingAmount: data.shippingAmount !== undefined ? Number(data.shippingAmount) : undefined,
      discountAmount: data.discountAmount !== undefined ? Number(data.discountAmount) : undefined,
      totalAmount: data.totalAmount !== undefined ? Number(data.totalAmount) : undefined,
      currency: data.currency ? data.currency.toUpperCase() : undefined,
      notes: data.notes ? data.notes.trim() : "",
    };
  }
}

