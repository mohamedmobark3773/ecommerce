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

export const createMessageValidator = [
  body("conversationId")
    .trim()
    .notEmpty()
    .withMessage("Conversation id is required.")
    .isMongoId()
    .withMessage("Invalid conversation id."),

  body("sender")
    .trim()
    .notEmpty()
    .withMessage("Sender is required.")
    .isMongoId()
    .withMessage("Invalid sender id."),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message content is required.")
    .isLength({ max: 5000 })
    .withMessage("Message content cannot exceed 5000 characters."),

  body("type")
    .optional()
    .isIn(["text", "image", "file"])
    .withMessage("Message type must be one of text, image, or file."),

  validate,
];

export const updateMessageValidator = [
  param("messageId")
    .isMongoId()
    .withMessage("Invalid message id."),

  body("content")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Message content cannot exceed 5000 characters."),

  body("type")
    .optional()
    .isIn(["text", "image", "file"])
    .withMessage("Message type must be one of text, image, or file."),

  validate,
];

export const messageIdValidator = [
  param("messageId")
    .isMongoId()
    .withMessage("Invalid message id."),

  validate,
];

