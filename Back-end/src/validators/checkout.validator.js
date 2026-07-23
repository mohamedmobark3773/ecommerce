import { body, param, query } from "express-validator";

export const createCheckoutValidator = [
  body("shippingAddressId")
    .trim()
    .notEmpty()
    .withMessage("Shipping address ID is required")
    .isMongoId()
    .withMessage("Invalid shipping address ID"),

  body("billingAddressId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid billing address ID"),

  body("shippingMethodId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid shipping method ID"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isString()
    .withMessage("Payment method must be a string")
    .isIn(["cod", "card", "paypal", "wallet", "stripe"])
    .withMessage("Invalid payment method. Supported: cod, card, paypal, wallet, stripe"),

  body("couponCode")
    .optional()
    .trim()
    .isString()
    .withMessage("Coupon code must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Coupon code must be between 3 and 50 characters")
];

export const updateCheckoutValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid checkout ID"),

  body("shippingAddressId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid shipping address ID"),

  body("billingAddressId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid billing address ID"),

  body("shippingMethodId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid shipping method ID"),

  body("paymentMethod")
    .optional()
    .trim()
    .isString()
    .withMessage("Payment method must be a string")
    .isIn(["cod", "card", "paypal", "wallet", "stripe"])
    .withMessage("Invalid payment method. Supported: cod, card, paypal, wallet, stripe"),

  body("couponCode")
    .optional()
    .trim()
    .isString()
    .withMessage("Coupon code must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Coupon code must be between 3 and 50 characters")
];

export const getCheckoutByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid checkout ID")
];

export const deleteCheckoutValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid checkout ID")
];

export const getAllCheckoutsValidator = [
  query("page")
    .optional()
    .trim()
    .isInt({ min: 1 })
    .withMessage("Page must be an integer greater than 0")
    .toInt(),

  query("limit")
    .optional()
    .trim()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100")
    .toInt(),

  query("sort")
    .optional()
    .trim()
    .isString()
    .withMessage("Sort parameter must be a string"),

  query("paymentMethod")
    .optional()
    .trim()
    .isIn(["cod", "card", "paypal", "wallet", "stripe"])
    .withMessage("Invalid payment method filter")
];
