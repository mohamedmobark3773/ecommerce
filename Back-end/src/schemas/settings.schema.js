import Joi from 'joi';

export const createSettingsSchema = Joi.object({
  key: Joi.string().trim().min(2).max(100).required(),
  value: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean(), Joi.object()).required(),
  category: Joi.string().trim().min(2).max(50).optional(),
  isPublic: Joi.boolean().optional(),
});

export const updateSettingsSchema = Joi.object({
  key: Joi.string().trim().min(2).max(100).optional(),
  value: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean(), Joi.object()).optional(),
  category: Joi.string().trim().min(2).max(50).optional(),
  isPublic: Joi.boolean().optional(),
}).min(1);

