import { body, param, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

export const createCouponValidator = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Coupon code must be between 3 and 50 characters."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  body("type")
    .notEmpty()
    .withMessage("Coupon type is required.")
    .isIn(["percentage", "fixed"])
    .withMessage("Coupon type must be percentage or fixed."),

  body("value")
    .notEmpty()
    .withMessage("Coupon value is required.")
    .isFloat({ min: 0 })
    .withMessage("Coupon value must be a non-negative number."),

  body("minimumOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum order amount must be a non-negative number."),

  body("maximumDiscountAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum discount amount must be a non-negative number."),

  body("usageLimit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Usage limit must be at least 1."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean."),

  body("applicableTo")
    .optional()
    .isIn(["all", "products", "categories"])
    .withMessage("Applicable to must be all, products, or categories."),

  validate,
];

export const updateCouponValidator = [
  param("couponId")
    .isMongoId()
    .withMessage("Invalid coupon id."),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Coupon code must be between 3 and 50 characters."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  body("type")
    .optional()
    .isIn(["percentage", "fixed"])
    .withMessage("Coupon type must be percentage or fixed."),

  body("value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Coupon value must be a non-negative number."),

  body("minimumOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum order amount must be a non-negative number."),

  body("maximumDiscountAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum discount amount must be a non-negative number."),

  body("usageLimit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Usage limit must be at least 1."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean."),

  body("applicableTo")
    .optional()
    .isIn(["all", "products", "categories"])
    .withMessage("Applicable to must be all, products, or categories."),

  validate,
];

export const couponIdValidator = [
  param("couponId")
    .isMongoId()
    .withMessage("Invalid coupon id."),

  validate,
];

