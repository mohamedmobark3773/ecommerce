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

export const createShippingValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Shipping method name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Shipping method name must be between 2 and 100 characters."),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Shipping code is required.")
    .matches(/^[A-Z0-9_-]+$/)
    .withMessage("Shipping code must contain only uppercase letters, numbers, hyphens, or underscores."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0."),

  body("currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-character ISO code."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("estimatedDays")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Estimated days must be at least 1."),

  validate,
];

export const updateShippingValidator = [
  param("shippingId")
    .isMongoId()
    .withMessage("Invalid shipping id."),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Shipping method name must be between 2 and 100 characters."),

  body("code")
    .optional()
    .trim()
    .matches(/^[A-Z0-9_-]+$/)
    .withMessage("Shipping code must contain only uppercase letters, numbers, hyphens, or underscores."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0."),

  body("currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-character ISO code."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("estimatedDays")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Estimated days must be at least 1."),

  validate,
];

export const shippingIdValidator = [
  param("shippingId")
    .isMongoId()
    .withMessage("Invalid shipping id."),

  validate,
];

