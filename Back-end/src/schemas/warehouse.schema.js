import Joi from 'joi';

export const createWarehouseSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  code: Joi.string().trim().min(2).max(30).required(),
  location: Joi.string().trim().max(500).optional(),
  managerId: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

export const updateWarehouseSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  code: Joi.string().trim().min(2).max(30).optional(),
  location: Joi.string().trim().max(500).optional(),
  managerId: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
}).min(1);

