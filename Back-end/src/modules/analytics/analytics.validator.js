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

export const getAnalyticsQueryValidator = [
  query("period")
    .optional()
    .trim()
    .isIn(["daily", "weekly", "monthly", "yearly", "today", "yesterday", "last7days", "last30days", "thisMonth", "lastMonth"])
    .withMessage("Invalid period filter"),

  query("startDate")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("Start date must be a valid ISO8601 date")
    .toDate(),

  query("endDate")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("End date must be a valid ISO8601 date")
    .toDate()
    .custom((value, { req }) => {
      if (req.query.startDate && new Date(value) < new Date(req.query.startDate)) {
        throw new Error("End date must be after or equal to start date");
      }
      return true;
    }),

  query("type")
    .optional()
    .trim()
    .isString()
    .withMessage("Type must be a string"),

  validate
];
