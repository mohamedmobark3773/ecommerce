import Joi from 'joi';

export const createCollectionSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  slug: Joi.string().trim().min(2).max(100).optional(),
  description: Joi.string().trim().max(1000).optional(),
  image: Joi.string().uri().optional(),
  isFeatured: Joi.boolean().optional(),
  status: Joi.string().valid('draft', 'published', 'archived').optional(),
  createdBy: Joi.string().hex().length(24).optional(),
});

export const updateCollectionSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  slug: Joi.string().trim().min(2).max(100).optional(),
  description: Joi.string().trim().max(1000).optional(),
  image: Joi.string().uri().optional(),
  isFeatured: Joi.boolean().optional(),
  status: Joi.string().valid('draft', 'published', 'archived').optional(),
  createdBy: Joi.string().hex().length(24).optional(),
}).min(1);

