import { validationResult, param, query } from "express-validator";

export const validate = (req, res, next) => {
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

export const mongoIdValidator = (fieldName = "id") => {
  return param(fieldName)
    .trim()
    .notEmpty()
    .withMessage(`${fieldName} is required`)
    .isMongoId()
    .withMessage(`Invalid ${fieldName}`);
};

export const paginationValidator = [
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
];

export const searchValidator = [
  query("search")
    .optional()
    .trim()
    .isString()
    .withMessage("Search query must be a string")
];

export const sortValidator = [
  query("sort")
    .optional()
    .trim()
    .isString()
    .withMessage("Sort parameter must be a string")
];
