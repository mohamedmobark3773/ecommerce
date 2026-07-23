import { body, param, query } from "express-validator";

export const createRefundValidator = [
  body("orderId")
    .trim()
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),

  body("paymentId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid payment ID"),

  body("amount")
    .notEmpty()
    .withMessage("Refund amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be a number greater than 0"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason for refund is required")
    .isString()
    .withMessage("Reason must be a string")
    .isLength({ min: 5, max: 500 })
    .withMessage("Reason must be between 5 and 500 characters"),

  body("items")
    .optional()
    .isArray()
    .withMessage("Items must be an array of refunded items"),

  body("items.*.product")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Product ID in items must be a valid MongoID"),

  body("items.*.quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Refunded quantity must be an integer greater than 0"),

  body("status")
    .optional()
    .trim()
    .isIn(["pending", "approved", "rejected", "processed"])
    .withMessage("Status must be pending, approved, rejected, or processed")
];

export const updateRefundValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid refund ID"),

  body("status")
    .optional()
    .trim()
    .isIn(["pending", "approved", "rejected", "processed"])
    .withMessage("Status must be pending, approved, rejected, or processed"),

  body("adminNotes")
    .optional()
    .trim()
    .isString()
    .withMessage("Admin notes must be a string")
    .isLength({ max: 1000 })
    .withMessage("Admin notes cannot exceed 1000 characters")
];

export const getRefundByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid refund ID")
];

export const deleteRefundValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid refund ID")
];

export const getAllRefundsValidator = [
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

  query("orderId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Order ID filter must be a valid MongoID"),

  query("status")
    .optional()
    .trim()
    .isIn(["pending", "approved", "rejected", "processed"])
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
