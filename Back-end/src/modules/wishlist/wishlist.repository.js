import { Wishlist } from "./wishlist.model.js";

class WishlistRepository {
  async create(wishlistData) {
    return await Wishlist.create(wishlistData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Wishlist.find(filter).sort(sort).skip(skip).limit(limit).populate("user", "fullName email").populate("product", "name price slug"),
      Wishlist.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(wishlistId) {
    return await Wishlist.findById(wishlistId).populate("user", "fullName email").populate("product", "name price slug");
  }

  async findOne(filter = {}) {
    return await Wishlist.findOne(filter).populate("user", "fullName email").populate("product", "name price slug");
  }

  async delete(filter = {}) {
    return await Wishlist.findOneAndDelete(filter);
  }
}

export const wishlistRepository = new WishlistRepository();

