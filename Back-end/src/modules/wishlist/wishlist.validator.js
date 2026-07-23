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

export const addToWishlistValidator = [
  body("user")
    .notEmpty()
    .withMessage("User is required.")
    .isMongoId()
    .withMessage("User must be a valid Mongo id."),

  body("product")
    .notEmpty()
    .withMessage("Product is required.")
    .isMongoId()
    .withMessage("Product must be a valid Mongo id."),

  validate,
];

export const removeWishlistValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user id."),

  param("productId")
    .isMongoId()
    .withMessage("Invalid product id."),

  validate,
];

