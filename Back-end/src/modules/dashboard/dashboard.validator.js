import { body, validationResult } from "express-validator";

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

export const dashboardStatsValidator = [
  body("totalOrders")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalOrders must be a non-negative integer."),

  body("totalRevenue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("totalRevenue must be a non-negative number."),

  body("totalProducts")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalProducts must be a non-negative integer."),

  body("totalCustomers")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalCustomers must be a non-negative integer."),

  validate,
];

