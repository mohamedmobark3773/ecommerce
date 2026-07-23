export class WishlistDTO {
  constructor(wishlist) {
    this.id = wishlist._id;
    this.user = wishlist.user;
    this.product = wishlist.product;
    this.addedAt = wishlist.addedAt;
    this.createdAt = wishlist.createdAt;
    this.updatedAt = wishlist.updatedAt;
  }

  static transform(wishlist) {
    if (!wishlist) return null;
    if (Array.isArray(wishlist)) {
      return wishlist.map((item) => new WishlistDTO(item));
    }
    return new WishlistDTO(wishlist);
  }

  static toDatabase(data) {
    return {
      user: data.user ? data.user : undefined,
      product: data.product ? data.product : undefined,
      addedAt: data.addedAt ? new Date(data.addedAt) : undefined,
    };
  }
}

