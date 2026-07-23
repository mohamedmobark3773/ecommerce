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

export const createReviewValidator = [
  body("user")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid user id."),

  body("product")
    .trim()
    .notEmpty()
    .withMessage("Product id is required.")
    .isMongoId()
    .withMessage("Invalid product id."),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required.")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5."),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters."),

  body("comment")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Comment cannot exceed 5000 characters."),

  body("isApproved")
    .optional()
    .isBoolean()
    .withMessage("isApproved must be a boolean."),

  validate,
];

export const updateReviewValidator = [
  param("reviewId")
    .isMongoId()
    .withMessage("Invalid review id."),

  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5."),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters."),

  body("comment")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Comment cannot exceed 5000 characters."),

  body("isApproved")
    .optional()
    .isBoolean()
    .withMessage("isApproved must be a boolean."),

  validate,
];

export const reviewIdValidator = [
  param("reviewId")
    .isMongoId()
    .withMessage("Invalid review id."),

  validate,
];

