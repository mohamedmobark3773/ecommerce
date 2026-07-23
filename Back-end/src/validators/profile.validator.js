import { body, param, query } from "express-validator";

export const createProfileValidator = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("avatar")
    .optional()
    .trim()
    .isURL()
    .withMessage("Avatar must be a valid URL"),

  body("gender")
    .optional()
    .trim()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid ISO8601 date")
    .toDate()
    .custom((value) => {
      if (new Date(value) >= new Date()) {
        throw new Error("Date of birth must be in the past");
      }
      return true;
    }),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("preferences")
    .optional()
    .isObject()
    .withMessage("Preferences must be an object"),

  body("preferences.language")
    .optional()
    .trim()
    .isString()
    .withMessage("Preferred language must be a string"),

  body("preferences.currency")
    .optional()
    .trim()
    .isString()
    .withMessage("Preferred currency must be a string")
    .isLength({ min: 3, max: 3 })
    .withMessage("Preferred currency must be a 3-character ISO code")
    .toUpperCase()
];

export const updateProfileValidator = [
  param("id")
    .optional()
    .isMongoId()
    .withMessage("Invalid profile ID"),

  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("avatar")
    .optional()
    .trim()
    .isURL()
    .withMessage("Avatar must be a valid URL"),

  body("gender")
    .optional()
    .trim()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid ISO8601 date")
    .toDate()
    .custom((value) => {
      if (new Date(value) >= new Date()) {
        throw new Error("Date of birth must be in the past");
      }
      return true;
    }),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("preferences")
    .optional()
    .isObject()
    .withMessage("Preferences must be an object"),

  body("preferences.language")
    .optional()
    .trim()
    .isString()
    .withMessage("Preferred language must be a string"),

  body("preferences.currency")
    .optional()
    .trim()
    .isString()
    .withMessage("Preferred currency must be a string")
    .isLength({ min: 3, max: 3 })
    .withMessage("Preferred currency must be a 3-character ISO code")
    .toUpperCase()
];

export const getProfileByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid profile ID")
];

export const deleteProfileValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid profile ID")
];

export const getAllProfilesValidator = [
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

  query("gender")
    .optional()
    .trim()
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender filter"),

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
