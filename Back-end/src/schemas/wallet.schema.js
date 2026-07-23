import Joi from 'joi';

export const createWalletSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  balance: Joi.number().min(0).required(),
  currency: Joi.string().trim().min(3).max(10).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

export const updateWalletSchema = Joi.object({
  userId: Joi.string().hex().length(24).optional(),
  balance: Joi.number().min(0).optional(),
  currency: Joi.string().trim().min(3).max(10).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
}).min(1);

