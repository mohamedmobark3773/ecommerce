import { body, param, query } from "express-validator";

export const createGiftCardValidator = [
  body("code")
    .optional()
    .trim()
    .isString()
    .withMessage("Gift card code must be a string")
    .isLength({ min: 8, max: 30 })
    .withMessage("Gift card code must be between 8 and 30 characters")
    .toUpperCase(),

  body("initialAmount")
    .notEmpty()
    .withMessage("Initial amount is required")
    .isFloat({ min: 1 })
    .withMessage("Initial amount must be a number greater than or equal to 1"),

  body("expiryDate")
    .optional()
    .isISO8601()
    .withMessage("Expiry date must be a valid ISO8601 date")
    .toDate()
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Expiry date must be in the future");
      }
      return true;
    }),

  body("recipientEmail")
    .trim()
    .notEmpty()
    .withMessage("Recipient email is required")
    .isEmail()
    .withMessage("Invalid recipient email address")
    .normalizeEmail(),

  body("senderName")
    .optional()
    .trim()
    .isString()
    .withMessage("Sender name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Sender name must be between 2 and 100 characters"),

  body("message")
    .optional()
    .trim()
    .isString()
    .withMessage("Message must be a string")
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "redeemed", "expired", "disabled"])
    .withMessage("Status must be active, redeemed, expired, or disabled")
];

export const updateGiftCardValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid gift card ID"),

  body("currentBalance")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Current balance must be a number greater than or equal to 0"),

  body("expiryDate")
    .optional()
    .isISO8601()
    .withMessage("Expiry date must be a valid ISO8601 date")
    .toDate(),

  body("recipientEmail")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid recipient email address")
    .normalizeEmail(),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "redeemed", "expired", "disabled"])
    .withMessage("Status must be active, redeemed, expired, or disabled")
];

export const getGiftCardByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid gift card ID")
];

export const deleteGiftCardValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid gift card ID")
];

export const getAllGiftCardsValidator = [
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
    .isIn(["active", "redeemed", "expired", "disabled"])
    .withMessage("Invalid status filter")
];

export const redeemGiftCardValidator = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Gift card code is required to redeem")
    .isString()
    .withMessage("Gift card code must be a string")
    .toUpperCase()
];
