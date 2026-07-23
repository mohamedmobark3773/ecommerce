export class SellerDTO {
  constructor(seller) {
    this.id = seller._id;
    this.user = seller.user;
    this.shopName = seller.shopName;
    this.shopSlug = seller.shopSlug;
    this.description = seller.description;
    this.logo = seller.logo;
    this.banner = seller.banner;
    this.status = seller.status;
    this.rating = seller.rating;
    this.isVerified = seller.isVerified;
    this.createdAt = seller.createdAt;
    this.updatedAt = seller.updatedAt;
  }

  static transform(seller) {
    if (!seller) return null;
    if (Array.isArray(seller)) {
      return seller.map((item) => new SellerDTO(item));
    }
    return new SellerDTO(seller);
  }

  static toDatabase(data) {
    return {
      user: data.user,
      shopName: data.shopName ? data.shopName.trim() : undefined,
      shopSlug: data.shopSlug ? data.shopSlug.trim().toLowerCase() : undefined,
      description: data.description ? data.description.trim() : undefined,
      logo: data.logo ? data.logo.trim() : undefined,
      banner: data.banner ? data.banner.trim() : undefined,
      status: data.status,
      rating: data.rating !== undefined ? Number(data.rating) : undefined,
      isVerified: data.isVerified !== undefined ? !!data.isVerified : undefined,
    };
  }
}

