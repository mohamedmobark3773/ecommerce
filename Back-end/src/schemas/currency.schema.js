import Joi from 'joi';

export const createCurrencySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  code: Joi.string().trim().min(3).max(10).required(),
  symbol: Joi.string().trim().min(1).max(10).optional(),
  rate: Joi.number().precision(4).optional(),
  isDefault: Joi.boolean().optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

export const updateCurrencySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  code: Joi.string().trim().min(3).max(10).optional(),
  symbol: Joi.string().trim().min(1).max(10).optional(),
  rate: Joi.number().precision(4).optional(),
  isDefault: Joi.boolean().optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
}).min(1);

