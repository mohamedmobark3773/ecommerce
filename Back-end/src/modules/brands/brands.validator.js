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

export const createBrandValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Brand name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Brand name must be between 2 and 100 characters."),

  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-_]+$/)
    .withMessage("Slug must contain only lowercase alphanumeric characters, hyphens, or underscores."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  body("logo")
    .optional()
    .trim()
    .isURL()
    .withMessage("Logo must be a valid URL."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean."),

  body("country")
    .optional()
    .trim()
    .isLength({ min: 2, max: 2 })
    .withMessage("Country must be a 2-letter code."),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL."),

  validate,
];

export const updateBrandValidator = [
  param("brandId")
    .isMongoId()
    .withMessage("Invalid brand id."),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Brand name must be between 2 and 100 characters."),

  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-_]+$/)
    .withMessage("Slug must contain only lowercase alphanumeric characters, hyphens, or underscores."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters."),

  body("logo")
    .optional()
    .trim()
    .isURL()
    .withMessage("Logo must be a valid URL."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean."),

  body("country")
    .optional()
    .trim()
    .isLength({ min: 2, max: 2 })
    .withMessage("Country must be a 2-letter code."),

  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Website must be a valid URL."),

  validate,
];

export const brandIdValidator = [
  param("brandId")
    .isMongoId()
    .withMessage("Invalid brand id."),

  validate,
];

