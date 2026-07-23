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

export const createUploadValidator = [
  body("entityType")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Entity type cannot exceed 50 characters."),

  body("entityId")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Entity id cannot exceed 100 characters."),

  body("altText")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Alt text cannot exceed 200 characters."),

  body("isPrimary")
    .optional()
    .isBoolean()
    .withMessage("isPrimary must be a boolean."),

  body("status")
    .optional()
    .trim()
    .isIn(["uploaded", "processing", "failed"])
    .withMessage("Status must be one of uploaded, processing, or failed."),

  validate,
];

export const updateUploadValidator = [
  param("uploadId")
    .isMongoId()
    .withMessage("Invalid upload id."),

  body("entityType")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Entity type cannot exceed 50 characters."),

  body("entityId")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Entity id cannot exceed 100 characters."),

  body("altText")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Alt text cannot exceed 200 characters."),

  body("isPrimary")
    .optional()
    .isBoolean()
    .withMessage("isPrimary must be a boolean."),

  body("status")
    .optional()
    .trim()
    .isIn(["uploaded", "processing", "failed"])
    .withMessage("Status must be one of uploaded, processing, or failed."),

  validate,
];

export const uploadIdValidator = [
  param("uploadId")
    .isMongoId()
    .withMessage("Invalid upload id."),

  validate,
];

