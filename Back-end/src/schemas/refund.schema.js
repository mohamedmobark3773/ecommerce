import Joi from 'joi';

export const createRefundSchema = Joi.object({
  orderId: Joi.string().hex().length(24).required(),
  customerId: Joi.string().hex().length(24).required(),
  amount: Joi.number().positive().required(),
  reason: Joi.string().trim().max(500).optional(),
  status: Joi.string().valid('requested', 'approved', 'rejected', 'completed').optional(),
});

export const updateRefundSchema = Joi.object({
  orderId: Joi.string().hex().length(24).optional(),
  customerId: Joi.string().hex().length(24).optional(),
  amount: Joi.number().positive().optional(),
  reason: Joi.string().trim().max(500).optional(),
  status: Joi.string().valid('requested', 'approved', 'rejected', 'completed').optional(),
}).min(1);

