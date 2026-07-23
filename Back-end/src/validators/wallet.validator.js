import { body, param, query } from "express-validator";

export const createWalletValidator = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("balance")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Balance must be a number greater than or equal to 0"),

  body("currency")
    .optional()
    .trim()
    .isString()
    .withMessage("Currency must be a string")
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-character ISO code")
    .toUpperCase(),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Status must be active, inactive, or suspended")
];

export const updateWalletValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid wallet ID"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Status must be active, inactive, or suspended"),

  body("currency")
    .optional()
    .trim()
    .isString()
    .withMessage("Currency must be a string")
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-character ISO code")
    .toUpperCase()
];

export const getWalletByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid wallet ID")
];

export const deleteWalletValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid wallet ID")
];

export const getAllWalletsValidator = [
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

  query("user")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("User filter must be a valid MongoID"),

  query("status")
    .optional()
    .trim()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Invalid status filter"),

  query("sort")
    .optional()
    .trim()
    .isString()
    .withMessage("Sort parameter must be a string")
];

export const walletTransactionValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid wallet ID"),

  body("amount")
    .notEmpty()
    .withMessage("Transaction amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be a number greater than 0"),

  body("transactionType")
    .trim()
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["deposit", "withdrawal", "purchase", "refund"])
    .withMessage("Transaction type must be deposit, withdrawal, purchase, or refund"),

  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters")
];
