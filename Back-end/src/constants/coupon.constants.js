//src/constants/coupon.constants.js

export const CouponTypes = {
    PERCENTAGE: "percentage",
    FIXED_AMOUNT: "fixed_amount",
}

export const CouponStatus = {
    VALID: "valid",
    EXPIRED: "expired",
    INVALID: "invalid",
}

export const DiscountTypes = {
    PERCENTAGE: "percentage",
    FIXED_AMOUNT: "fixed_amount",
}

export const ValidationMessages = {
    INVALID_COUPON_TYPE: "Invalid coupon type.",
    INVALID_COUPON_STATUS: "Invalid coupon status.",
    INVALID_DISCOUNT_TYPE: "Invalid discount type.",
}

export const ErrorMessages = {
    COUPON_NOT_FOUND: "Coupon not found.",
    COUPON_ALREADY_EXISTS: "Coupon already exists.",
    COUPON_EXPIRED: "Coupon has expired.",
    COUPON_INVALID: "Coupon is invalid.",
    COUPON_USED: "Coupon has already been used.",
}

export const SuccessMessages = {
    COUPON_CREATED: "Coupon created successfully.",
    COUPON_UPDATED: "Coupon updated successfully.",
    COUPON_DELETED: "Coupon deleted successfully.",
    COUPON_FOUND: "Coupon found successfully.",
    COUPON_LISTED: "Coupons listed successfully.",
}

export const CouponLimits = {
    MAX_DISCOUNT_PERCENTAGE: 100,
    MAX_DISCOUNT_AMOUNT: 1000,
}