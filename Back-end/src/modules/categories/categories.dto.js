export class CategoryDTO {
  constructor(category) {
    this.id = category._id;
    this.name = category.name;
    this.slug = category.slug;
    this.description = category.description;
    this.image = category.image;
    this.isFeatured = category.isFeatured;
    this.isActive = category.isActive;
    this.parent = category.parent;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }

  static transform(category) {
    if (!category) return null;
    if (Array.isArray(category)) {
      return category.map((item) => new CategoryDTO(item));
    }
    return new CategoryDTO(category);
  }

  static toDatabase(data) {
    return {
      name: data.name ? data.name.trim() : undefined,
      slug: data.slug ? data.slug.trim().toLowerCase() : undefined,
      description: data.description ? data.description.trim() : undefined,
      image: data.image ? data.image.trim() : undefined,
      isFeatured: data.isFeatured !== undefined ? !!data.isFeatured : false,
      isActive: data.isActive !== undefined ? !!data.isActive : true,
      parent: data.parent || null,
    };
  }
}

