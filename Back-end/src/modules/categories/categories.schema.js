import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-_]+$/).optional(),
  description: Joi.string().trim().max(1000).optional(),
  image: Joi.string().trim().uri().optional(),
  isFeatured: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
  parent: Joi.string().hex().length(24).optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-_]+$/).optional(),
  description: Joi.string().trim().max(1000).optional(),
  image: Joi.string().trim().uri().optional(),
  isFeatured: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
  parent: Joi.string().hex().length(24).optional(),
});

