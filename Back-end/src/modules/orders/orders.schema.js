import Joi from "joi";

export const createOrderSchema = Joi.object({
  user: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).required(),
  orderNumber: Joi.string().trim().min(1).max(100).required(),
  status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled", "refunded").optional(),
  paymentStatus: Joi.string().valid("pending", "paid", "failed", "refunded").optional(),
  shippingAddress: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).optional(),
  billingAddress: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).optional(),
  shippingMethod: Joi.string().trim().max(100).optional(),
  items: Joi.array().items(Joi.string()).optional(),
  subtotal: Joi.number().min(0).optional(),
  taxAmount: Joi.number().min(0).optional(),
  shippingAmount: Joi.number().min(0).optional(),
  discountAmount: Joi.number().min(0).optional(),
  totalAmount: Joi.number().min(0).optional(),
  currency: Joi.string().trim().max(10).optional(),
  notes: Joi.string().trim().max(2000).optional(),
});

export const updateOrderSchema = Joi.object({
  status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled", "refunded").optional(),
  paymentStatus: Joi.string().valid("pending", "paid", "failed", "refunded").optional(),
  shippingAddress: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).optional(),
  billingAddress: Joi.string().trim().pattern(/^[a-fA-F0-9]{24}$/).optional(),
  shippingMethod: Joi.string().trim().max(100).optional(),
  subtotal: Joi.number().min(0).optional(),
  taxAmount: Joi.number().min(0).optional(),
  shippingAmount: Joi.number().min(0).optional(),
  discountAmount: Joi.number().min(0).optional(),
  totalAmount: Joi.number().min(0).optional(),
  currency: Joi.string().trim().max(10).optional(),
  notes: Joi.string().trim().max(2000).optional(),
});

