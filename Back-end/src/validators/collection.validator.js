import { body, param, query } from "express-validator";

export const createCollectionValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Collection name is required")
    .isString()
    .withMessage("Collection name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Collection name must be between 2 and 100 characters"),

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

  body("products")
    .optional()
    .isArray()
    .withMessage("Products must be an array of product IDs"),

  body("products.*")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Each product ID must be a valid MongoID"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive")
];

export const updateCollectionValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid collection ID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Collection name cannot be empty")
    .isString()
    .withMessage("Collection name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Collection name must be between 2 and 100 characters"),

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

  body("products")
    .optional()
    .isArray()
    .withMessage("Products must be an array"),

  body("products.*")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Each product ID must be a valid MongoID"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive")
];

export const getCollectionByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid collection ID")
];

export const deleteCollectionValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid collection ID")
];

export const getAllCollectionsValidator = [
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
