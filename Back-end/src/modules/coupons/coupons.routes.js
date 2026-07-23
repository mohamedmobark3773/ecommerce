import { Router } from "express";
import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from "./coupons.controller.js";
import { createCouponValidator, updateCouponValidator, couponIdValidator } from "./coupons.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createCouponValidator, validate, createCoupon)
  .get(getCoupons);

router.route("/:couponId")
  .get(couponIdValidator, getCouponById)
  .put(couponIdValidator, updateCouponValidator, updateCoupon)
  .delete(couponIdValidator, deleteCoupon);

export default router;

