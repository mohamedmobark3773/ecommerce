export class BrandDTO {
  constructor(brand) {
    this.id = brand._id;
    this.name = brand.name;
    this.slug = brand.slug;
    this.description = brand.description;
    this.logo = brand.logo;
    this.isActive = brand.isActive;
    this.isFeatured = brand.isFeatured;
    this.country = brand.country;
    this.website = brand.website;
    this.createdAt = brand.createdAt;
    this.updatedAt = brand.updatedAt;
  }

  static transform(brand) {
    if (!brand) return null;
    if (Array.isArray(brand)) {
      return brand.map((item) => new BrandDTO(item));
    }
    return new BrandDTO(brand);
  }

  static toDatabase(data) {
    return {
      name: data.name ? data.name.trim() : undefined,
      slug: data.slug ? data.slug.trim().toLowerCase() : undefined,
      description: data.description ? data.description.trim() : undefined,
      logo: data.logo ? data.logo.trim() : undefined,
      isActive: data.isActive !== undefined ? !!data.isActive : true,
      isFeatured: data.isFeatured !== undefined ? !!data.isFeatured : false,
      country: data.country ? data.country.trim().toUpperCase() : undefined,
      website: data.website ? data.website.trim() : undefined,
    };
  }
}

