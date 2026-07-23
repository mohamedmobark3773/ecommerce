export class ProductDTO {
  constructor(product) {
    this.id = product._id || product.id || null;
    this.name = product.name || '';
    this.slug = product.slug || '';
    this.description = product.description || '';
    this.price = product.price || 0;
    this.category = product.category || null;
    this.brand = product.brand || null;
    this.isActive = typeof product.isActive === 'boolean' ? product.isActive : true;
    this.createdAt = product.createdAt || null;
    this.updatedAt = product.updatedAt || null;
  }

  static transform(product) {
    if (!product) return null;
    if (Array.isArray(product)) {
      return product.map((item) => new ProductDTO(item));
    }
    return new ProductDTO(product);
  }

  static toDatabase(data = {}) {
    return {
      name: data.name ? data.name.trim() : undefined,
      slug: data.slug ? data.slug.trim().toLowerCase() : undefined,
      description: data.description ? data.description.trim() : undefined,
      price: typeof data.price === 'number' ? data.price : undefined,
      category: data.category || undefined,
      brand: data.brand || undefined,
      isActive: typeof data.isActive === 'boolean' ? data.isActive : undefined,
    };
  }
}

export default ProductDTO;

