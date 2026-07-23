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

export const createOrderItemValidator = [
  body("order")
    .trim()
    .notEmpty()
    .withMessage("Order id is required.")
    .isMongoId()
    .withMessage("Invalid order id."),

  body("product")
    .trim()
    .notEmpty()
    .withMessage("Product id is required.")
    .isMongoId()
    .withMessage("Invalid product id."),

  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),

  body("unitPrice")
    .isFloat({ min: 0 })
    .withMessage("Unit price must be a non-negative number."),

  body("totalPrice")
    .isFloat({ min: 0 })
    .withMessage("Total price must be a non-negative number."),

  body("status")
    .optional()
    .isIn(["pending", "processing", "shipped", "delivered", "cancelled"])
    .withMessage("Status must be one of pending, processing, shipped, delivered, or cancelled."),

  validate,
];

export const updateOrderItemValidator = [
  param("orderItemId")
    .isMongoId()
    .withMessage("Invalid order item id."),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),

  body("unitPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Unit price must be a non-negative number."),

  body("totalPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total price must be a non-negative number."),

  body("status")
    .optional()
    .isIn(["pending", "processing", "shipped", "delivered", "cancelled"])
    .withMessage("Status must be one of pending, processing, shipped, delivered, or cancelled."),

  validate,
];

export const orderItemIdValidator = [
  param("orderItemId")
    .isMongoId()
    .withMessage("Invalid order item id."),

  validate,
];

