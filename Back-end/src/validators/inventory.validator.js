import { body, param, query } from "express-validator";

export const createInventoryValidator = [
  body("product")
    .trim()
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("variant")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid variant ID"),

  body("warehouse")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid warehouse ID"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required")
    .isString()
    .withMessage("SKU must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("SKU must be between 3 and 50 characters")
    .toUpperCase(),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),

  body("reservedQuantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Reserved quantity must be an integer greater than or equal to 0"),

  body("lowStockThreshold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Low stock threshold must be an integer greater than or equal to 0"),

  body("status")
    .optional()
    .trim()
    .isIn(["in_stock", "low_stock", "out_of_stock", "damaged"])
    .withMessage("Status must be in_stock, low_stock, out_of_stock, or damaged")
];

export const updateInventoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid inventory ID"),

  body("product")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("variant")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid variant ID"),

  body("warehouse")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid warehouse ID"),

  body("sku")
    .optional()
    .trim()
    .isString()
    .withMessage("SKU must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("SKU must be between 3 and 50 characters")
    .toUpperCase(),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),

  body("reservedQuantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Reserved quantity must be an integer greater than or equal to 0"),

  body("lowStockThreshold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Low stock threshold must be an integer greater than or equal to 0"),

  body("status")
    .optional()
    .trim()
    .isIn(["in_stock", "low_stock", "out_of_stock", "damaged"])
    .withMessage("Status must be in_stock, low_stock, out_of_stock, or damaged")
];

export const getInventoryByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid inventory ID")
];

export const deleteInventoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid inventory ID")
];

export const getAllInventoryValidator = [
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

  query("variant")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Variant filter must be a valid MongoID"),

  query("warehouse")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Warehouse filter must be a valid MongoID"),

  query("search")
    .optional()
    .trim()
    .isString()
    .withMessage("Search query must be a string"),

  query("status")
    .optional()
    .trim()
    .isIn(["in_stock", "low_stock", "out_of_stock", "damaged"])
    .withMessage("Invalid status filter")
];

export const adjustStockValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid inventory ID"),

  body("adjustment")
    .notEmpty()
    .withMessage("Adjustment value is required")
    .isInt()
    .withMessage("Adjustment must be a non-zero integer")
    .custom((value) => {
      if (value === 0) {
        throw new Error("Adjustment cannot be zero");
      }
      return true;
    })
];
