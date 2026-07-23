export class SubcategoryDTO {
  constructor(subcategory) {
    this.id = subcategory._id || subcategory.id || null;
    this.name = subcategory.name || '';
    this.category = subcategory.category || null;
    this.slug = subcategory.slug || '';
    this.createdAt = subcategory.createdAt || null;
    this.updatedAt = subcategory.updatedAt || null;
  }

  static transform(subcategory) {
    if (!subcategory) return null;
    if (Array.isArray(subcategory)) {
      return subcategory.map((item) => new SubcategoryDTO(item));
    }
    return new SubcategoryDTO(subcategory);
  }

  static toDatabase(data = {}) {
    return {
      name: data.name ? data.name.trim() : undefined,
      category: data.category || undefined,
      slug: data.slug ? data.slug.trim().toLowerCase() : undefined,
    };
  }
}

export default SubcategoryDTO;

