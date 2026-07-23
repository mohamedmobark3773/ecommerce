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

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required.")
    .isLength({ min: 2, max: 200 })
    .withMessage("Product name must be between 2 and 200 characters."),

  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-_]+$/)
    .withMessage("Slug must contain only lowercase alphanumeric characters, hyphens, or underscores."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required.")
    .isLength({ min: 10, max: 5000 })
    .withMessage("Description must be between 10 and 5000 characters."),

  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0."),

  body("compareAtPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Compare at price must be a number greater than or equal to 0."),

  body("costPerItem")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Cost per item must be a number greater than or equal to 0."),

  body("sku")
    .optional()
    .trim()
    .isString()
    .withMessage("SKU must be a string."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category id is required.")
    .isMongoId()
    .withMessage("Invalid category id."),

  body("subcategory")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid subcategory id."),

  body("brand")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid brand id."),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0."),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array of URLs."),

  body("images.*")
    .optional()
    .trim()
    .isURL()
    .withMessage("Each image must be a valid URL."),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array."),

  body("attributes.*.attributeId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Attribute id must be a valid Mongo id."),

  body("attributes.*.value")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Attribute value cannot be empty."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean."),

  body("status")
    .optional()
    .isIn(["active", "draft", "archived"])
    .withMessage("Status must be one of active, draft, or archived."),

  validate,
];

export const updateProductValidator = [
  param("productId")
    .isMongoId()
    .withMessage("Invalid product id."),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Product name must be between 2 and 200 characters."),

  body("slug")
    .optional()
    .trim()
    .matches(/^[a-z0-9-_]+$/)
    .withMessage("Slug must contain only lowercase alphanumeric characters, hyphens, or underscores."),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage("Description must be between 10 and 5000 characters."),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0."),

  body("compareAtPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Compare at price must be a number greater than or equal to 0."),

  body("costPerItem")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Cost per item must be a number greater than or equal to 0."),

  body("sku")
    .optional()
    .trim()
    .isString()
    .withMessage("SKU must be a string."),

  body("category")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid category id."),

  body("subcategory")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid subcategory id."),

  body("brand")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid brand id."),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0."),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array of URLs."),

  body("images.*")
    .optional()
    .trim()
    .isURL()
    .withMessage("Each image must be a valid URL."),

  body("attributes")
    .optional()
    .isArray()
    .withMessage("Attributes must be an array."),

  body("attributes.*.attributeId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Attribute id must be a valid Mongo id."),

  body("attributes.*.value")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Attribute value cannot be empty."),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean."),

  body("status")
    .optional()
    .isIn(["active", "draft", "archived"])
    .withMessage("Status must be one of active, draft, or archived."),

  validate,
];

export const productIdValidator = [
  param("productId")
    .isMongoId()
    .withMessage("Invalid product id."),

  validate,
];

