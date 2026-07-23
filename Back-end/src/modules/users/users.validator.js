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

export const createUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be a valid email address."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6, max: 72 })
    .withMessage("Password must be between 6 and 72 characters."),

  body("role")
    .optional()
    .trim()
    .isIn(["customer", "admin", "seller"])
    .withMessage("Role must be customer, admin, or seller."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("phone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone cannot exceed 20 characters."),

  validate,
];

export const updateUserValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user id."),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters."),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address."),

  body("password")
    .optional()
    .trim()
    .isLength({ min: 6, max: 72 })
    .withMessage("Password must be between 6 and 72 characters."),

  body("role")
    .optional()
    .trim()
    .isIn(["customer", "admin", "seller"])
    .withMessage("Role must be customer, admin, or seller."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("phone")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Phone cannot exceed 20 characters."),

  validate,
];

export const userIdValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user id."),

  validate,
];

