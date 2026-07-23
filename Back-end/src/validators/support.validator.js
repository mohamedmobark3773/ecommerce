import { body, param, query } from "express-validator";

export const createSupportTicketValidator = [
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isString()
    .withMessage("Subject must be a string")
    .isLength({ min: 5, max: 150 })
    .withMessage("Subject must be between 5 and 150 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 3000 })
    .withMessage("Description must be between 10 and 3000 characters"),

  body("priority")
    .optional()
    .trim()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Priority must be low, medium, high, or urgent"),

  body("category")
    .optional()
    .trim()
    .isIn(["billing", "shipping", "technical", "returns", "general"])
    .withMessage("Category must be billing, shipping, technical, returns, or general"),

  body("orderId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid order ID"),

  body("productId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("attachments")
    .optional()
    .isArray()
    .withMessage("Attachments must be an array of attachment URLs"),

  body("attachments.*")
    .optional()
    .trim()
    .isURL()
    .withMessage("Each attachment must be a valid URL")
];

export const updateSupportTicketValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid support ticket ID"),

  body("status")
    .optional()
    .trim()
    .isIn(["open", "in_progress", "resolved", "closed"])
    .withMessage("Status must be open, in_progress, resolved, or closed"),

  body("priority")
    .optional()
    .trim()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Priority must be low, medium, high, or urgent"),

  body("resolutionNotes")
    .optional()
    .trim()
    .isString()
    .withMessage("Resolution notes must be a string")
    .isLength({ max: 2000 })
    .withMessage("Resolution notes cannot exceed 2000 characters")
];

export const getSupportTicketByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid support ticket ID")
];

export const deleteSupportTicketValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid support ticket ID")
];

export const getAllSupportTicketsValidator = [
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

  query("status")
    .optional()
    .trim()
    .isIn(["open", "in_progress", "resolved", "closed"])
    .withMessage("Invalid status filter"),

  query("priority")
    .optional()
    .trim()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Invalid priority filter"),

  query("category")
    .optional()
    .trim()
    .isIn(["billing", "shipping", "technical", "returns", "general"])
    .withMessage("Invalid category filter"),

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
