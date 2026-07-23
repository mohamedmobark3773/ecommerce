import { body, param, query } from "express-validator";
import { validate } from "../../validators/base.validator.js";

export const updateSettingsValidator = [
  body("siteName")
    .optional()
    .trim()
    .isString()
    .withMessage("Site name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Site name must be between 2 and 100 characters"),

  body("siteEmail")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid site email address")
    .normalizeEmail(),

  body("supportPhone")
    .optional()
    .trim()
    .isString()
    .withMessage("Support phone must be a string"),

  body("maintenanceMode")
    .optional()
    .isBoolean()
    .withMessage("Maintenance mode must be a boolean"),

  body("currency")
    .optional()
    .trim()
    .isString()
    .withMessage("Currency must be a string")
    .isLength({ min: 3, max: 3 })
    .withMessage("Currency must be a 3-letter ISO code")
    .toUpperCase(),

  body("allowedCountries")
    .optional()
    .isArray()
    .withMessage("Allowed countries must be an array"),

  body("allowedCountries.*")
    .optional()
    .trim()
    .isString()
    .withMessage("Each allowed country must be a string"),

  body("taxRate")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax rate must be a percentage between 0 and 100"),

  body("shippingFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Shipping fee must be a number greater than or equal to 0"),

  validate
];

export const updateUserStatusValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user ID parameter"),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Status must be active, inactive, or suspended"),

  validate
];

export const updateUserRoleValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user ID parameter"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["super_admin", "admin", "moderator", "user", "seller"])
    .withMessage("Role must be super_admin, admin, moderator, user, or seller"),

  validate
];

export const getUsersQueryValidator = [
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

  query("role")
    .optional()
    .trim()
    .isIn(["super_admin", "admin", "moderator", "user", "seller"])
    .withMessage("Invalid role filter"),

  query("status")
    .optional()
    .trim()
    .isIn(["active", "inactive", "suspended"])
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
    .withMessage("Sort parameter must be a string"),

  validate
];
