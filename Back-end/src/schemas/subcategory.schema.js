import Joi from 'joi';

export const createSubcategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  slug: Joi.string().trim().min(2).max(100).optional(),
  categoryId: Joi.string().hex().length(24).required(),
  description: Joi.string().trim().max(1000).optional(),
  status: Joi.string().valid('draft', 'published', 'archived').optional(),
});

export const updateSubcategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  slug: Joi.string().trim().min(2).max(100).optional(),
  categoryId: Joi.string().hex().length(24).optional(),
  description: Joi.string().trim().max(1000).optional(),
  status: Joi.string().valid('draft', 'published', 'archived').optional(),
}).min(1);

