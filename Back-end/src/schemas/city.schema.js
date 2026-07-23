import Joi from 'joi';

export const createCitySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  state: Joi.string().trim().min(2).max(100).optional(),
  country: Joi.string().trim().min(2).max(100).optional(),
  code: Joi.string().trim().min(1).max(20).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

export const updateCitySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  state: Joi.string().trim().min(2).max(100).optional(),
  country: Joi.string().trim().min(2).max(100).optional(),
  code: Joi.string().trim().min(1).max(20).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
}).min(1);

