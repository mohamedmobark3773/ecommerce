export class CartItemDTO {
  constructor(item) {
    this.id = item._id;
    this.product = item.product;
    this.variant = item.variant;
    this.quantity = item.quantity;
    this.price = item.price;
    this.currency = item.currency;
    this.subtotal = item.subtotal;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }

  static transform(item) {
    if (!item) return null;
    if (Array.isArray(item)) {
      return item.map((entry) => new CartItemDTO(entry));
    }
    return new CartItemDTO(item);
  }
}

export class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.user = cart.user;
    this.items = CartItemDTO.transform(cart.items || []);
    this.itemsCount = cart.itemsCount ?? (cart.items || []).length;
    this.totalItems = cart.totalItems ?? (cart.items || []).length;
    this.subtotal = cart.subtotal ?? 0;
    this.total = cart.total ?? cart.subtotal ?? 0;
    this.currency = cart.currency || "USD";
    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }

  static transform(cart) {
    if (!cart) return null;
    if (Array.isArray(cart)) {
      return cart.map((entry) => new CartDTO(entry));
    }
    return new CartDTO(cart);
  }

  static toDatabase(data) {
    return {
      user: data.user,
      items: Array.isArray(data.items) ? data.items : [],
      subtotal: data.subtotal !== undefined ? Number(data.subtotal) : 0,
      total: data.total !== undefined ? Number(data.total) : 0,
      currency: data.currency ? data.currency.toUpperCase() : "USD",
    };
  }
}

