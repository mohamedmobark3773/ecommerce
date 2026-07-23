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

export const createPaymentValidator = [
  body("order")
    .trim()
    .notEmpty()
    .withMessage("Order id is required.")
    .isMongoId()
    .withMessage("Invalid order id."),

  body("user")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid user id."),

  body("paymentMethod")
    .optional()
    .isIn(["cod", "card", "paypal", "wallet", "stripe"])
    .withMessage("Payment method must be one of cod, card, paypal, wallet, or stripe."),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than 0."),

  body("currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-character ISO code."),

  body("transactionId")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Transaction id cannot exceed 100 characters."),

  body("status")
    .optional()
    .isIn(["pending", "completed", "failed", "refunded"])
    .withMessage("Status must be one of pending, completed, failed, or refunded."),

  validate,
];

export const updatePaymentValidator = [
  param("paymentId")
    .isMongoId()
    .withMessage("Invalid payment id."),

  body("paymentMethod")
    .optional()
    .isIn(["cod", "card", "paypal", "wallet", "stripe"])
    .withMessage("Payment method must be one of cod, card, paypal, wallet, or stripe."),

  body("amount")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than 0."),

  body("currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-character ISO code."),

  body("transactionId")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Transaction id cannot exceed 100 characters."),

  body("status")
    .optional()
    .isIn(["pending", "completed", "failed", "refunded"])
    .withMessage("Status must be one of pending, completed, failed, or refunded."),

  validate,
];

export const paymentIdValidator = [
  param("paymentId")
    .isMongoId()
    .withMessage("Invalid payment id."),

  validate,
];

