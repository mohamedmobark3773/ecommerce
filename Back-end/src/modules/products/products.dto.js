export class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.name = product.name;
    this.slug = product.slug;
    this.description = product.description;
    this.price = product.price;
    this.compareAtPrice = product.compareAtPrice;
    this.costPerItem = product.costPerItem;
    this.sku = product.sku;
    this.category = product.category;
    this.subcategory = product.subcategory;
    this.brand = product.brand;
    this.stock = product.stock;
    this.images = product.images || [];
    this.attributes = product.attributes || [];
    this.isFeatured = product.isFeatured;
    this.status = product.status;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }

  static transform(product) {
    if (!product) return null;
    if (Array.isArray(product)) {
      return product.map((item) => new ProductDTO(item));
    }
    return new ProductDTO(product);
  }

  static toDatabase(data) {
    return {
      name: data.name ? data.name.trim() : undefined,
      slug: data.slug ? data.slug.trim().toLowerCase() : undefined,
      description: data.description ? data.description.trim() : undefined,
      price: data.price !== undefined ? Number(data.price) : undefined,
      compareAtPrice: data.compareAtPrice !== undefined ? Number(data.compareAtPrice) : undefined,
      costPerItem: data.costPerItem !== undefined ? Number(data.costPerItem) : undefined,
      sku: data.sku ? data.sku.trim().toUpperCase() : undefined,
      category: data.category,
      subcategory: data.subcategory || undefined,
      brand: data.brand || undefined,
      stock: data.stock !== undefined ? Number(data.stock) : undefined,
      images: data.images || undefined,
      attributes: data.attributes || undefined,
      isFeatured: data.isFeatured !== undefined ? !!data.isFeatured : undefined,
      status: data.status,
    };
  }
}

