import Joi from "joi";

export const createNotificationSchema = Joi.object({
  title: Joi.string().trim().min(1).max(150).required(),
  message: Joi.string().trim().min(1).max(2000).required(),
  type: Joi.string().valid("info", "success", "warning", "error").optional(),
  link: Joi.string().trim().uri().optional(),
});

