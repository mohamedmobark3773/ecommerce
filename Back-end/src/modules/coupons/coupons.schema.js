import Joi from "joi";

export const createCouponSchema = Joi.object({
  code: Joi.string().trim().min(3).max(50).required(),
  description: Joi.string().trim().max(1000).optional(),
  type: Joi.string().valid("percentage", "fixed").required(),
  value: Joi.number().min(0).required(),
  minimumOrderAmount: Joi.number().min(0).optional(),
  maximumDiscountAmount: Joi.number().min(0).optional(),
  usageLimit: Joi.number().min(1).optional(),
  startsAt: Joi.date().optional(),
  expiresAt: Joi.date().optional(),
  isActive: Joi.boolean().optional(),
  isFeatured: Joi.boolean().optional(),
  applicableTo: Joi.string().valid("all", "products", "categories").optional(),
  applicableItems: Joi.array().items(Joi.string()).optional(),
  applicableToModel: Joi.string().valid("Product", "Category").optional(),
});

export const updateCouponSchema = Joi.object({
  code: Joi.string().trim().min(3).max(50).optional(),
  description: Joi.string().trim().max(1000).optional(),
  type: Joi.string().valid("percentage", "fixed").optional(),
  value: Joi.number().min(0).optional(),
  minimumOrderAmount: Joi.number().min(0).optional(),
  maximumDiscountAmount: Joi.number().min(0).optional(),
  usageLimit: Joi.number().min(1).optional(),
  startsAt: Joi.date().optional(),
  expiresAt: Joi.date().optional(),
  isActive: Joi.boolean().optional(),
  isFeatured: Joi.boolean().optional(),
  applicableTo: Joi.string().valid("all", "products", "categories").optional(),
  applicableItems: Joi.array().items(Joi.string()).optional(),
  applicableToModel: Joi.string().valid("Product", "Category").optional(),
});

