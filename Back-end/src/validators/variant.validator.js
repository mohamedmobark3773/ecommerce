import { body, param, query } from "express-validator";

export const createVariantValidator = [
  body("product")
    .trim()
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required")
    .isString()
    .withMessage("SKU must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("SKU must be between 3 and 50 characters")
    .toUpperCase(),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

  body("compareAtPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Compare at price must be a number greater than or equal to 0")
    .custom((value, { req }) => {
      if (req.body.price && Number(value) <= Number(req.body.price)) {
        throw new Error("Compare at price must be greater than price");
      }
      return true;
    }),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array of image URLs"),

  body("images.*")
    .optional()
    .trim()
    .isURL()
    .withMessage("Each image must be a valid URL"),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array"),

  body("attributes.*.attributeId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Attribute ID must be a valid MongoID"),

  body("attributes.*.value")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Attribute value cannot be empty"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive")
];

export const updateVariantValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid variant ID"),

  body("product")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("sku")
    .optional()
    .trim()
    .isString()
    .withMessage("SKU must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("SKU must be between 3 and 50 characters")
    .toUpperCase(),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

  body("compareAtPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Compare at price must be a number greater than or equal to 0")
    .custom((value, { req }) => {
      const price = req.body.price;
      if (price && Number(value) <= Number(price)) {
        throw new Error("Compare at price must be greater than price");
      }
      return true;
    }),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  body("images.*")
    .optional()
    .trim()
    .isURL()
    .withMessage("Each image must be a valid URL"),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array"),

  body("attributes.*.attributeId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Attribute ID must be a valid MongoID"),

  body("attributes.*.value")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Attribute value cannot be empty"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive")
];

export const getVariantByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid variant ID")
];

export const deleteVariantValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid variant ID")
];

export const getAllVariantsValidator = [
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

  query("product")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Product filter must be a valid MongoID"),

  query("sku")
    .optional()
    .trim()
    .isString()
    .withMessage("SKU filter must be a string"),

  query("status")
    .optional()
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Invalid status filter"),

  query("search")
    .optional()
    .trim()
    .isString()
    .withMessage("Search query must be a string"),

  query("sort")
    .optional()
    .trim()
    .isString()
    .withMessage("Sort parameter must be a string")
];
