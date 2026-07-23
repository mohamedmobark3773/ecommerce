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

export const createSellerValidator = [
  body("user")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid user id."),

  body("shopName")
    .trim()
    .notEmpty()
    .withMessage("Shop name is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Shop name must be between 2 and 150 characters."),

  body("shopSlug")
    .trim()
    .notEmpty()
    .withMessage("Shop slug is required.")
    .matches(/^[a-z0-9-_]+$/)
    .withMessage("Shop slug must contain only lowercase alphanumeric characters, hyphens, or underscores."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters."),

  body("logo")
    .optional()
    .trim()
    .isURL()
    .withMessage("Logo must be a valid URL."),

  body("banner")
    .optional()
    .trim()
    .isURL()
    .withMessage("Banner must be a valid URL."),

  body("status")
    .optional()
    .isIn(["pending", "active", "suspended"])
    .withMessage("Status must be pending, active, or suspended."),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5."),

  body("isVerified")
    .optional()
    .isBoolean()
    .withMessage("isVerified must be a boolean."),

  validate,
];

export const updateSellerValidator = [
  param("sellerId")
    .isMongoId()
    .withMessage("Invalid seller id."),

  body("shopName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Shop name must be between 2 and 150 characters."),

  body("shopSlug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-_]+$/)
    .withMessage("Shop slug must contain only lowercase alphanumeric characters, hyphens, or underscores."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters."),

  body("logo")
    .optional()
    .trim()
    .isURL()
    .withMessage("Logo must be a valid URL."),

  body("banner")
    .optional()
    .trim()
    .isURL()
    .withMessage("Banner must be a valid URL."),

  body("status")
    .optional()
    .isIn(["pending", "active", "suspended"])
    .withMessage("Status must be pending, active, or suspended."),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5."),

  body("isVerified")
    .optional()
    .isBoolean()
    .withMessage("isVerified must be a boolean."),

  validate,
];

export const sellerIdValidator = [
  param("sellerId")
    .isMongoId()
    .withMessage("Invalid seller id."),

  validate,
];

