import { Coupon } from "./coupons.model.js";

class CouponsRepository {
  async create(couponData) {
    return await Coupon.create(couponData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [coupons, total] = await Promise.all([
      Coupon.find(filter).sort(sort).skip(skip).limit(limit),
      Coupon.countDocuments(filter),
    ]);

    return {
      coupons,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(couponId) {
    return await Coupon.findById(couponId);
  }

  async findOne(filter) {
    return await Coupon.findOne(filter);
  }

  async update(couponId, couponData) {
    return await Coupon.findByIdAndUpdate(couponId, { $set: couponData }, { new: true, runValidators: true });
  }

  async delete(couponId) {
    return await Coupon.findByIdAndDelete(couponId);
  }
}

export const couponsRepository = new CouponsRepository();

