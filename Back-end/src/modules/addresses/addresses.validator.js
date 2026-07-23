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

export const createAddressValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Full name must be between 3 and 100 characters."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isMobilePhone()
    .withMessage("Invalid phone number."),

  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country is required."),

  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required."),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),

  body("street")
    .trim()
    .notEmpty()
    .withMessage("Street is required."),

  body("postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required."),

  body("addressType")
    .optional()
    .isIn(["home", "work", "other"])
    .withMessage("Invalid address type."),

  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be a boolean."),

  body("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude."),

  body("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude."),

  validate
];

export const updateAddressValidator = [
  param("addressId")
    .isMongoId()
    .withMessage("Invalid address id."),

  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Full name must be between 3 and 100 characters."),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage("Invalid phone number."),

  body("country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty."),

  body("state")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("State cannot be empty."),

  body("city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty."),

  body("street")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Street cannot be empty."),

  body("postalCode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Postal code cannot be empty."),

  body("addressType")
    .optional()
    .isIn(["home", "work", "other"])
    .withMessage("Invalid address type."),

  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be a boolean."),

  body("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude."),

  body("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude."),

  validate
];

export const addressIdValidator = [
  param("addressId")
    .isMongoId()
    .withMessage("Invalid address id."),

  validate
];
