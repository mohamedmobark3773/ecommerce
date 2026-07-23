import { Seller } from "./seller.model.js";

class SellersRepository {
  async create(sellerData) {
    return await Seller.create(sellerData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [sellers, total] = await Promise.all([
      Seller.find(filter).sort(sort).skip(skip).limit(limit).populate("user"),
      Seller.countDocuments(filter),
    ]);

    return {
      sellers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(sellerId) {
    return await Seller.findById(sellerId).populate("user");
  }

  async update(sellerId, sellerData) {
    return await Seller.findByIdAndUpdate(sellerId, { $set: sellerData }, { new: true, runValidators: true }).populate("user");
  }

  async delete(sellerId) {
    return await Seller.findByIdAndDelete(sellerId);
  }
}

export const sellersRepository = new SellersRepository();

