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

export const createChatValidator = [
  body("participantId")
    .trim()
    .notEmpty()
    .withMessage("Participant id is required.")
    .isMongoId()
    .withMessage("Invalid participant id."),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Chat title cannot exceed 100 characters."),

  validate,
];

export const sendMessageValidator = [
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

export const chatIdValidator = [
  param("chatId")
    .isMongoId()
    .withMessage("Invalid chat id."),

  validate,
];

