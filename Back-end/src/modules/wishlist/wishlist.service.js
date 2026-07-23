import { wishlistRepository } from "./wishlist.repository.js";
import { WishlistDTO } from "./wishlist.dto.js";

class WishlistService {
  async addToWishlist(wishlistData) {
    const formattedData = WishlistDTO.toDatabase(wishlistData);
    const existing = await wishlistRepository.findOne({ user: formattedData.user, product: formattedData.product });

    if (existing) {
      return WishlistDTO.transform(existing);
    }

    const item = await wishlistRepository.create(formattedData);
    return WishlistDTO.transform(item);
  }

  async getWishlist(query = {}) {
    const filter = {};
    const options = {};

    if (query.user) filter.user = query.user;
    if (query.product) filter.product = query.product;

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await wishlistRepository.findAll(filter, options);
    return {
      ...result,
      items: WishlistDTO.transform(result.items),
    };
  }

  async removeFromWishlist(userId, productId) {
    const item = await wishlistRepository.delete({ user: userId, product: productId });
    return WishlistDTO.transform(item);
  }
}

export const wishlistService = new WishlistService();

