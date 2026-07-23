import Joi from "joi";

export const searchSchema = Joi.object({
  q: Joi.string().trim().optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
});

