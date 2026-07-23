export class CouponDTO {
  constructor(coupon) {
    this.id = coupon._id;
    this.code = coupon.code;
    this.description = coupon.description;
    this.type = coupon.type;
    this.value = coupon.value;
    this.minimumOrderAmount = coupon.minimumOrderAmount;
    this.maximumDiscountAmount = coupon.maximumDiscountAmount;
    this.usageLimit = coupon.usageLimit;
    this.usedCount = coupon.usedCount;
    this.startsAt = coupon.startsAt;
    this.expiresAt = coupon.expiresAt;
    this.isActive = coupon.isActive;
    this.isFeatured = coupon.isFeatured;
    this.applicableTo = coupon.applicableTo;
    this.applicableItems = coupon.applicableItems || [];
    this.createdAt = coupon.createdAt;
    this.updatedAt = coupon.updatedAt;
  }

  static transform(coupon) {
    if (!coupon) return null;
    if (Array.isArray(coupon)) {
      return coupon.map((item) => new CouponDTO(item));
    }
    return new CouponDTO(coupon);
  }

  static toDatabase(data) {
    return {
      code: data.code ? data.code.trim().toUpperCase() : undefined,
      description: data.description ? data.description.trim() : undefined,
      type: data.type,
      value: data.value !== undefined ? Number(data.value) : undefined,
      minimumOrderAmount: data.minimumOrderAmount !== undefined ? Number(data.minimumOrderAmount) : undefined,
      maximumDiscountAmount: data.maximumDiscountAmount !== undefined ? Number(data.maximumDiscountAmount) : undefined,
      usageLimit: data.usageLimit !== undefined ? Number(data.usageLimit) : undefined,
      startsAt: data.startsAt ? new Date(data.startsAt) : undefined,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      isActive: data.isActive !== undefined ? !!data.isActive : true,
      isFeatured: data.isFeatured !== undefined ? !!data.isFeatured : false,
      applicableTo: data.applicableTo,
      applicableItems: data.applicableItems || undefined,
      applicableToModel: data.applicableToModel || undefined,
    };
  }
}

