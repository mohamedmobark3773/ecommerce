export class ShippingDTO {
  constructor(shipping) {
    this.id = shipping._id;
    this.name = shipping.name;
    this.code = shipping.code;
    this.description = shipping.description;
    this.price = shipping.price;
    this.currency = shipping.currency;
    this.isActive = shipping.isActive;
    this.estimatedDays = shipping.estimatedDays;
    this.createdAt = shipping.createdAt;
    this.updatedAt = shipping.updatedAt;
  }

  static transform(shipping) {
    if (!shipping) return null;
    if (Array.isArray(shipping)) {
      return shipping.map((item) => new ShippingDTO(item));
    }
    return new ShippingDTO(shipping);
  }

  static toDatabase(data) {
    return {
      name: data.name ? data.name.trim() : undefined,
      code: data.code ? data.code.trim().toUpperCase() : undefined,
      description: data.description ? data.description.trim() : undefined,
      price: data.price !== undefined ? Number(data.price) : undefined,
      currency: data.currency ? data.currency.toUpperCase() : undefined,
      isActive: data.isActive !== undefined ? !!data.isActive : undefined,
      estimatedDays: data.estimatedDays !== undefined ? Number(data.estimatedDays) : undefined,
    };
  }
}

