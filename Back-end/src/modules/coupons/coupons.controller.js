import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { couponsService } from "./coupons.service.js";

export const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await couponsService.createCoupon(req.body);

  return res.status(201).json({
    success: true,
    message: "Coupon created successfully.",
    data: coupon,
  });
});

export const getCoupons = asyncHandler(async (req, res) => {
  const result = await couponsService.getCoupons(req.query);

  return res.status(200).json({
    success: true,
    message: "Coupons retrieved successfully.",
    data: result,
  });
});

export const getCouponById = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const coupon = await couponsService.getCouponById(couponId);

  if (!coupon) {
    throw new ApiError(404, "Coupon not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Coupon retrieved successfully.",
    data: coupon,
  });
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const coupon = await couponsService.updateCoupon(couponId, req.body);

  if (!coupon) {
    throw new ApiError(404, "Coupon not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Coupon updated successfully.",
    data: coupon,
  });
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const coupon = await couponsService.deleteCoupon(couponId);

  if (!coupon) {
    throw new ApiError(404, "Coupon not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Coupon deleted successfully.",
    data: coupon,
  });
});

