import Joi from "joi";

export const createSellerSchema = Joi.object({
  user: Joi.string().hex().length(24).optional(),
  shopName: Joi.string().trim().min(2).max(150).required(),
  shopSlug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-_]+$/).required(),
  description: Joi.string().trim().max(2000).optional(),
  logo: Joi.string().trim().uri().optional(),
  banner: Joi.string().trim().uri().optional(),
  status: Joi.string().valid("pending", "active", "suspended").optional(),
  rating: Joi.number().min(0).max(5).optional(),
  isVerified: Joi.boolean().optional(),
});

export const updateSellerSchema = Joi.object({
  shopName: Joi.string().trim().min(2).max(150).optional(),
  shopSlug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-_]+$/).optional(),
  description: Joi.string().trim().max(2000).optional(),
  logo: Joi.string().trim().uri().optional(),
  banner: Joi.string().trim().uri().optional(),
  status: Joi.string().valid("pending", "active", "suspended").optional(),
  rating: Joi.number().min(0).max(5).optional(),
  isVerified: Joi.boolean().optional(),
});

