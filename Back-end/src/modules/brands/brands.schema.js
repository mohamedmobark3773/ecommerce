import Joi from "joi";

export const createBrandSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-_]+$/).optional(),
  description: Joi.string().trim().max(1000).optional(),
  logo: Joi.string().trim().uri().optional(),
  isActive: Joi.boolean().optional(),
  isFeatured: Joi.boolean().optional(),
  country: Joi.string().trim().uppercase().length(2).optional(),
  website: Joi.string().trim().uri().optional(),
});

export const updateBrandSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-_]+$/).optional(),
  description: Joi.string().trim().max(1000).optional(),
  logo: Joi.string().trim().uri().optional(),
  isActive: Joi.boolean().optional(),
  isFeatured: Joi.boolean().optional(),
  country: Joi.string().trim().uppercase().length(2).optional(),
  website: Joi.string().trim().uri().optional(),
});

