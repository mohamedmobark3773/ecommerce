import Joi from "joi";

export const createMessageSchema = Joi.object({
  conversationId: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).required(),
  sender: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).required(),
  content: Joi.string().trim().min(1).max(5000).required(),
  type: Joi.string().valid("text", "image", "file").optional(),
  isRead: Joi.boolean().optional(),
});

export const updateMessageSchema = Joi.object({
  content: Joi.string().trim().min(1).max(5000).optional(),
  type: Joi.string().valid("text", "image", "file").optional(),
  isRead: Joi.boolean().optional(),
});

