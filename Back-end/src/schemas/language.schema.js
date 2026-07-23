import Joi from 'joi';

export const createLanguageSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  code: Joi.string().trim().min(2).max(10).required(),
  direction: Joi.string().valid('ltr', 'rtl').optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

export const updateLanguageSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  code: Joi.string().trim().min(2).max(10).optional(),
  direction: Joi.string().valid('ltr', 'rtl').optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
}).min(1);

