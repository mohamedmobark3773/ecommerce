import Joi from 'joi';

export const createInvoiceSchema = Joi.object({
  orderId: Joi.string().hex().length(24).required(),
  customerId: Joi.string().hex().length(24).required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().trim().min(3).max(10).optional(),
  status: Joi.string().valid('draft', 'paid', 'pending', 'overdue').optional(),
  issuedAt: Joi.date().optional(),
});

export const updateInvoiceSchema = Joi.object({
  orderId: Joi.string().hex().length(24).optional(),
  customerId: Joi.string().hex().length(24).optional(),
  amount: Joi.number().positive().optional(),
  currency: Joi.string().trim().min(3).max(10).optional(),
  status: Joi.string().valid('draft', 'paid', 'pending', 'overdue').optional(),
  issuedAt: Joi.date().optional(),
}).min(1);

