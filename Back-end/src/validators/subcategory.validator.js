import { body, param, query } from "express-validator";

export const createSubcategoryValidator = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Parent category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Subcategory name is required")
    .isString()
    .withMessage("Subcategory name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Subcategory name must be between 2 and 100 characters"),

  body("slug")
    .optional()
    .trim()
    .isString()
    .withMessage("Slug must be a string")
    .matches(/^[a-z0-9-_]+$/)
    .withMessage("Slug must contain only lowercase alphanumeric characters, hyphens, or underscores"),

  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive")
];

export const updateSubcategoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid subcategory ID"),

  body("category")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Subcategory name cannot be empty")
    .isString()
    .withMessage("Subcategory name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Subcategory name must be between 2 and 100 characters"),

  body("slug")
    .optional()
    .trim()
    .isString()
    .withMessage("Slug must be a string")
    .matches(/^[a-z0-9-_]+$/)
    .withMessage("Slug must contain only lowercase alphanumeric characters, hyphens, or underscores"),

  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive")
];

export const getSubcategoryByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid subcategory ID")
];

export const deleteSubcategoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid subcategory ID")
];

export const getAllSubcategoriesValidator = [
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

  query("category")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Category filter must be a valid MongoID"),

  query("search")
    .optional()
    .trim()
    .isString()
    .withMessage("Search query must be a string"),

  query("sort")
    .optional()
    .trim()
    .isString()
    .withMessage("Sort parameter must be a string"),

  query("status")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status filter must be active or inactive")
];
