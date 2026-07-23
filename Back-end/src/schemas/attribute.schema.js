import Joi from 'joi';

export const createAttributeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  values: Joi.array().items(Joi.string().trim().min(1)).optional(),
  createdBy: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

export const updateAttributeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
  values: Joi.array().items(Joi.string().trim().min(1)).optional(),
  createdBy: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
}).min(1);

