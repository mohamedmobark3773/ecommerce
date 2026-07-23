import Joi from 'joi';

export const createSupportTicketSchema = Joi.object({
  customerId: Joi.string().hex().length(24).required(),
  subject: Joi.string().trim().min(2).max(200).required(),
  message: Joi.string().trim().min(2).max(5000).required(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  status: Joi.string().valid('open', 'pending', 'closed').optional(),
});

export const updateSupportTicketSchema = Joi.object({
  customerId: Joi.string().hex().length(24).optional(),
  subject: Joi.string().trim().min(2).max(200).optional(),
  message: Joi.string().trim().min(2).max(5000).optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  status: Joi.string().valid('open', 'pending', 'closed').optional(),
}).min(1);

