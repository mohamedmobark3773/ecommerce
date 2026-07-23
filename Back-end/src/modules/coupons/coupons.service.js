import { couponsRepository } from "./coupons.repository.js";
import { CouponDTO } from "./coupons.dto.js";

class CouponsService {
  async createCoupon(couponData) {
    const formattedData = CouponDTO.toDatabase(couponData);
    const coupon = await couponsRepository.create(formattedData);
    return CouponDTO.transform(coupon);
  }

  async getCoupons(query = {}) {
    const filter = {};
    const options = {};

    if (query.search) {
      const search = query.search.trim();
      filter.$or = [{ code: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
    }

    if (query.type) filter.type = query.type;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true" || query.isActive === true;
    if (query.isFeatured !== undefined) filter.isFeatured = query.isFeatured === "true" || query.isFeatured === true;
    if (query.applicableTo) filter.applicableTo = query.applicableTo;
    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await couponsRepository.findAll(filter, options);
    return {
      ...result,
      coupons: CouponDTO.transform(result.coupons),
    };
  }

  async getCouponById(couponId) {
    const coupon = await couponsRepository.findById(couponId);
    return CouponDTO.transform(coupon);
  }

  async updateCoupon(couponId, couponData) {
    const formattedData = CouponDTO.toDatabase(couponData);
    const coupon = await couponsRepository.update(couponId, formattedData);
    return CouponDTO.transform(coupon);
  }

  async deleteCoupon(couponId) {
    const coupon = await couponsRepository.delete(couponId);
    return CouponDTO.transform(coupon);
  }
}

export const couponsService = new CouponsService();

