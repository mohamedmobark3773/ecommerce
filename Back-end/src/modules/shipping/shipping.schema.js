import Joi from "joi";

export const createShippingSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  code: Joi.string().trim().uppercase().pattern(/^[A-Z0-9_-]+$/).required(),
  description: Joi.string().trim().max(500).optional(),
  price: Joi.number().min(0).required(),
  currency: Joi.string().trim().uppercase().length(3).optional(),
  isActive: Joi.boolean().optional(),
  estimatedDays: Joi.number().integer().min(1).optional(),
});

export const updateShippingSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  code: Joi.string().trim().uppercase().pattern(/^[A-Z0-9_-]+$/).optional(),
  description: Joi.string().trim().max(500).optional(),
  price: Joi.number().min(0).optional(),
  currency: Joi.string().trim().uppercase().length(3).optional(),
  isActive: Joi.boolean().optional(),
  estimatedDays: Joi.number().integer().min(1).optional(),
});

