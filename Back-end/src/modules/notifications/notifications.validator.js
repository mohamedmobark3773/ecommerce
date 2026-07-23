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

export const createNotificationValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Notification title is required.")
    .isLength({ max: 150 })
    .withMessage("Notification title cannot exceed 150 characters."),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Notification message is required.")
    .isLength({ max: 2000 })
    .withMessage("Notification message cannot exceed 2000 characters."),

  body("type")
    .optional()
    .isIn(["info", "success", "warning", "error"])
    .withMessage("Notification type must be one of info, success, warning, or error."),

  body("link")
    .optional()
    .trim()
    .isURL()
    .withMessage("Link must be a valid URL."),

  validate,
];

export const notificationIdValidator = [
  param("notificationId")
    .isMongoId()
    .withMessage("Invalid notification id."),

  validate,
];

