import Joi from "joi";

export const createPaymentSchema = Joi.object({
  order: Joi.string().hex().length(24).required(),
  user: Joi.string().hex().length(24).optional(),
  paymentMethod: Joi.string().valid("cod", "card", "paypal", "wallet", "stripe").optional(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().trim().uppercase().length(3).optional(),
  transactionId: Joi.string().trim().max(100).optional(),
  status: Joi.string().valid("pending", "completed", "failed", "refunded").optional(),
  meta: Joi.object().optional(),
});

export const updatePaymentSchema = Joi.object({
  order: Joi.string().hex().length(24).optional(),
  user: Joi.string().hex().length(24).optional(),
  paymentMethod: Joi.string().valid("cod", "card", "paypal", "wallet", "stripe").optional(),
  amount: Joi.number().positive().optional(),
  currency: Joi.string().trim().uppercase().length(3).optional(),
  transactionId: Joi.string().trim().max(100).optional(),
  status: Joi.string().valid("pending", "completed", "failed", "refunded").optional(),
  meta: Joi.object().optional(),
});

