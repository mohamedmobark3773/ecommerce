import Joi from 'joi';

export const createGiftCardSchema = Joi.object({
  code: Joi.string().trim().min(3).max(50).required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().trim().min(3).max(10).optional(),
  balance: Joi.number().min(0).optional(),
  expiresAt: Joi.date().optional(),
  status: Joi.string().valid('active', 'used', 'expired').optional(),
  recipient: Joi.string().hex().length(24).optional(),
});

export const updateGiftCardSchema = Joi.object({
  code: Joi.string().trim().min(3).max(50).optional(),
  amount: Joi.number().positive().optional(),
  currency: Joi.string().trim().min(3).max(10).optional(),
  balance: Joi.number().min(0).optional(),
  expiresAt: Joi.date().optional(),
  status: Joi.string().valid('active', 'used', 'expired').optional(),
  recipient: Joi.string().hex().length(24).optional(),
}).min(1);

