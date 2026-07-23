import Joi from "joi";

export const createChatSchema = Joi.object({
  participantId: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).required(),
  title: Joi.string().trim().max(100).optional(),
});

export const sendMessageSchema = Joi.object({
  content: Joi.string().trim().min(1).max(5000).required(),
  type: Joi.string().valid("text", "image", "file").optional(),
});

