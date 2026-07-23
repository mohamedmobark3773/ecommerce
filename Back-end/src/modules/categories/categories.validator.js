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

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be between 2 and 100 characters."),

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

  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image must be a valid URL."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("parent")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid parent category id."),

  validate,
];

export const updateCategoryValidator = [
  param("categoryId")
    .isMongoId()
    .withMessage("Invalid category id."),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be between 2 and 100 characters."),

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

  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image must be a valid URL."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("parent")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid parent category id."),

  validate,
];

export const categoryIdValidator = [
  param("categoryId")
    .isMongoId()
    .withMessage("Invalid category id."),

  validate,
];

