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

export const addToCartValidator = [
  body("product")
    .trim()
    .notEmpty()
    .withMessage("Product id is required.")
    .isMongoId()
    .withMessage("Invalid product id."),

  body("variant")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid variant id."),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0."),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number."),

  body("subtotal")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Subtotal must be a non-negative number."),

  body("currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-letter code."),

  validate,
];

export const updateCartItemValidator = [
  param("cartItemId")
    .isMongoId()
    .withMessage("Invalid cart item id."),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0."),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number."),

  body("subtotal")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Subtotal must be a non-negative number."),

  validate,
];

export const cartItemIdValidator = [
  param("cartItemId")
    .isMongoId()
    .withMessage("Invalid cart item id."),

  validate,
];

