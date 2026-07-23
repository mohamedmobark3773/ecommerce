import Joi from 'joi';

export const createVariantSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  name: Joi.string().trim().min(2).max(100).required(),
  sku: Joi.string().trim().min(2).max(100).optional(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).optional(),
  attributes: Joi.array().items(Joi.object()).optional(),
});

export const updateVariantSchema = Joi.object({
  productId: Joi.string().hex().length(24).optional(),
  name: Joi.string().trim().min(2).max(100).optional(),
  sku: Joi.string().trim().min(2).max(100).optional(),
  price: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  attributes: Joi.array().items(Joi.object()).optional(),
}).min(1);

