import Joi from "joi";

export const createOrderItemSchema = Joi.object({
  order: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).required(),
  product: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).required(),
  variant: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).optional(),
  quantity: Joi.number().integer().min(1).required(),
  unitPrice: Joi.number().min(0).required(),
  totalPrice: Joi.number().min(0).required(),
  discountAmount: Joi.number().min(0).optional(),
  taxAmount: Joi.number().min(0).optional(),
  status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").optional(),
});

export const updateOrderItemSchema = Joi.object({
  order: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).optional(),
  product: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).optional(),
  variant: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).optional(),
  quantity: Joi.number().integer().min(1).optional(),
  unitPrice: Joi.number().min(0).optional(),
  totalPrice: Joi.number().min(0).optional(),
  discountAmount: Joi.number().min(0).optional(),
  taxAmount: Joi.number().min(0).optional(),
  status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").optional(),
});

