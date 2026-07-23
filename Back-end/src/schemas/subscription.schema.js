import Joi from 'joi';

export const createSubscriptionSchema = Joi.object({
  customerId: Joi.string().hex().length(24).required(),
  plan: Joi.string().trim().min(2).max(100).required(),
  status: Joi.string().valid('active', 'canceled', 'past_due').optional(),
  startedAt: Joi.date().optional(),
  endsAt: Joi.date().optional(),
});

export const updateSubscriptionSchema = Joi.object({
  customerId: Joi.string().hex().length(24).optional(),
  plan: Joi.string().trim().min(2).max(100).optional(),
  status: Joi.string().valid('active', 'canceled', 'past_due').optional(),
  startedAt: Joi.date().optional(),
  endsAt: Joi.date().optional(),
}).min(1);

