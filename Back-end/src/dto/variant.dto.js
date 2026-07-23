export class VariantDTO {
  constructor(variant) {
    this.id = variant._id || variant.id || null;
    this.product = variant.product || null;
    this.name = variant.name || '';
    this.sku = variant.sku || '';
    this.price = variant.price || 0;
    this.createdAt = variant.createdAt || null;
    this.updatedAt = variant.updatedAt || null;
  }

  static transform(variant) {
    if (!variant) return null;
    if (Array.isArray(variant)) {
      return variant.map((item) => new VariantDTO(item));
    }
    return new VariantDTO(variant);
  }

  static toDatabase(data = {}) {
    return {
      product: data.product || undefined,
      name: data.name ? data.name.trim() : undefined,
      sku: data.sku ? data.sku.trim() : undefined,
      price: typeof data.price === 'number' ? data.price : undefined,
    };
  }
}

export default VariantDTO;

