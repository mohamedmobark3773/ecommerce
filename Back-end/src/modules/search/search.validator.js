import { query, validationResult } from "express-validator";

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

export const searchValidator = [
  query("q")
    .optional()
    .trim()
    .isString()
    .withMessage("Search query must be a string."),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be an integer greater than 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  validate,
];

