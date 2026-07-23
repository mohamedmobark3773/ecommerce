import Joi from 'joi';

export const createInventorySchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  sku: Joi.string().trim().min(2).max(100).required(),
  quantity: Joi.number().integer().min(0).required(),
  reserved: Joi.number().integer().min(0).optional(),
  warehouseId: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid('in_stock', 'low_stock', 'out_of_stock').optional(),
});

export const updateInventorySchema = Joi.object({
  productId: Joi.string().hex().length(24).optional(),
  sku: Joi.string().trim().min(2).max(100).optional(),
  quantity: Joi.number().integer().min(0).optional(),
  reserved: Joi.number().integer().min(0).optional(),
  warehouseId: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid('in_stock', 'low_stock', 'out_of_stock').optional(),
}).min(1);

