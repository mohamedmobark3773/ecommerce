export class OrderItemDTO {
  constructor(orderItem) {
    this.id = orderItem._id;
    this.order = orderItem.order;
    this.product = orderItem.product;
    this.variant = orderItem.variant;
    this.quantity = orderItem.quantity;
    this.unitPrice = orderItem.unitPrice;
    this.totalPrice = orderItem.totalPrice;
    this.discountAmount = orderItem.discountAmount;
    this.taxAmount = orderItem.taxAmount;
    this.status = orderItem.status;
    this.createdAt = orderItem.createdAt;
    this.updatedAt = orderItem.updatedAt;
  }

  static transform(orderItem) {
    if (!orderItem) return null;
    if (Array.isArray(orderItem)) {
      return orderItem.map((item) => new OrderItemDTO(item));
    }
    return new OrderItemDTO(orderItem);
  }

  static toDatabase(data) {
    return {
      order: data.order,
      product: data.product,
      variant: data.variant || null,
      quantity: data.quantity !== undefined ? Number(data.quantity) : undefined,
      unitPrice: data.unitPrice !== undefined ? Number(data.unitPrice) : undefined,
      totalPrice: data.totalPrice !== undefined ? Number(data.totalPrice) : undefined,
      discountAmount: data.discountAmount !== undefined ? Number(data.discountAmount) : undefined,
      taxAmount: data.taxAmount !== undefined ? Number(data.taxAmount) : undefined,
      status: data.status,
    };
  }
}

