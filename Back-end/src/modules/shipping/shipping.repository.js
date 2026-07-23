import { Shipping } from "./shipping.model.js";

class ShippingRepository {
  async create(shippingData) {
    return await Shipping.create(shippingData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [shippingMethods, total] = await Promise.all([
      Shipping.find(filter).sort(sort).skip(skip).limit(limit),
      Shipping.countDocuments(filter),
    ]);

    return {
      shippingMethods,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(shippingId) {
    return await Shipping.findById(shippingId);
  }

  async update(shippingId, shippingData) {
    return await Shipping.findByIdAndUpdate(shippingId, { $set: shippingData }, { new: true, runValidators: true });
  }

  async delete(shippingId) {
    return await Shipping.findByIdAndDelete(shippingId);
  }
}

export const shippingRepository = new ShippingRepository();

