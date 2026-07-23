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

export const createOrderValidator = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("User id is required.")
    .isMongoId()
    .withMessage("Invalid user id."),

  body("orderNumber")
    .trim()
    .notEmpty()
    .withMessage("Order number is required.")
    .isLength({ max: 100 })
    .withMessage("Order number cannot exceed 100 characters."),

  body("status")
    .optional()
    .isIn(["pending", "processing", "shipped", "delivered", "cancelled", "refunded"])
    .withMessage("Status must be one of pending, processing, shipped, delivered, cancelled, or refunded."),

  body("paymentStatus")
    .optional()
    .isIn(["pending", "paid", "failed", "refunded"])
    .withMessage("Payment status must be one of pending, paid, failed, or refunded."),

  validate,
];

export const updateOrderValidator = [
  param("orderId")
    .isMongoId()
    .withMessage("Invalid order id."),

  body("status")
    .optional()
    .isIn(["pending", "processing", "shipped", "delivered", "cancelled", "refunded"])
    .withMessage("Status must be one of pending, processing, shipped, delivered, cancelled, or refunded."),

  body("paymentStatus")
    .optional()
    .isIn(["pending", "paid", "failed", "refunded"])
    .withMessage("Payment status must be one of pending, paid, failed, or refunded."),

  validate,
];

export const orderIdValidator = [
  param("orderId")
    .isMongoId()
    .withMessage("Invalid order id."),

  validate,
];

