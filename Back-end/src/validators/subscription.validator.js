import { body, param, query } from "express-validator";

export const createSubscriptionValidator = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("planId")
    .trim()
    .notEmpty()
    .withMessage("Plan ID is required")
    .isMongoId()
    .withMessage("Invalid plan ID"),

  body("interval")
    .trim()
    .notEmpty()
    .withMessage("Subscription interval is required")
    .isIn(["day", "week", "month", "year"])
    .withMessage("Interval must be day, week, month, or year"),

  body("intervalCount")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Interval count must be a positive integer"),

  body("price")
    .notEmpty()
    .withMessage("Subscription price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

  body("paymentMethodId")
    .optional()
    .trim()
    .isString()
    .withMessage("Payment method ID must be a string"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid ISO8601 date")
    .toDate(),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive", "paused", "cancelled"])
    .withMessage("Status must be active, inactive, paused, or cancelled")
];

export const updateSubscriptionValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid subscription ID"),

  body("status")
    .optional()
    .trim()
    .isIn(["active", "inactive", "paused", "cancelled"])
    .withMessage("Status must be active, inactive, paused, or cancelled"),

  body("paymentMethodId")
    .optional()
    .trim()
    .isString()
    .withMessage("Payment method ID must be a string"),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid ISO8601 date")
    .toDate()
];

export const getSubscriptionByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid subscription ID")
];

export const deleteSubscriptionValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid subscription ID")
];

export const getAllSubscriptionsValidator = [
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

  query("planId")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Plan filter must be a valid MongoID"),

  query("status")
    .optional()
    .trim()
    .isIn(["active", "inactive", "paused", "cancelled"])
    .withMessage("Invalid status filter"),

  query("sort")
    .optional()
    .trim()
    .isString()
    .withMessage("Sort parameter must be a string")
];

export const newsletterSubscribeValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required for subscription")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail()
];
