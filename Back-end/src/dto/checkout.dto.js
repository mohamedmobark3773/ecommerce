export class CheckoutDTO {
  constructor(checkout) {
    this.id = checkout._id || checkout.id || null;
    this.user = checkout.user || null;
    this.items = checkout.items || [];
    this.shippingAddress = checkout.shippingAddress || null;
    this.billingAddress = checkout.billingAddress || null;
    this.paymentMethod = checkout.paymentMethod || null;
    this.couponCode = checkout.couponCode || null;
    this.subtotal = checkout.subtotal || 0;
    this.discount = checkout.discount || 0;
    this.tax = checkout.tax || 0;
    this.total = checkout.total || 0;
    this.status = checkout.status || 'pending';
    this.createdAt = checkout.createdAt || null;
    this.updatedAt = checkout.updatedAt || null;
  }

  static transform(checkout) {
    if (!checkout) return null;
    if (Array.isArray(checkout)) {
      return checkout.map((item) => new CheckoutDTO(item));
    }
    return new CheckoutDTO(checkout);
  }

  static toDatabase(data = {}) {
    return {
      user: data.user || undefined,
      items: Array.isArray(data.items) ? data.items : [],
      shippingAddress: data.shippingAddress || undefined,
      billingAddress: data.billingAddress || undefined,
      paymentMethod: data.paymentMethod || undefined,
      couponCode: data.couponCode ? data.couponCode.trim() : undefined,
      subtotal: typeof data.subtotal === 'number' ? data.subtotal : undefined,
      discount: typeof data.discount === 'number' ? data.discount : undefined,
      tax: typeof data.tax === 'number' ? data.tax : undefined,
      total: typeof data.total === 'number' ? data.total : undefined,
      status: data.status ? data.status : undefined,
    };
  }
}

export default CheckoutDTO;

