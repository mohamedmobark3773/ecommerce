import Joi from 'joi';

export const createCountrySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  code: Joi.string().trim().min(2).max(10).required(),
  isoCode: Joi.string().trim().min(2).max(10).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

export const updateCountrySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  code: Joi.string().trim().min(2).max(10).optional(),
  isoCode: Joi.string().trim().min(2).max(10).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
}).min(1);

