import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).required(),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-_]+$/).optional(),
  description: Joi.string().trim().min(10).max(5000).required(),
  price: Joi.number().min(0).required(),
  compareAtPrice: Joi.number().min(0).optional(),
  costPerItem: Joi.number().min(0).optional(),
  sku: Joi.string().trim().uppercase().optional(),
  category: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).optional(),
  brand: Joi.string().hex().length(24).optional(),
  stock: Joi.number().integer().min(0).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  attributes: Joi.array().items(
    Joi.object({
      attributeId: Joi.string().hex().length(24).required(),
      value: Joi.string().trim().required(),
    })
  ).optional(),
  isFeatured: Joi.boolean().optional(),
  status: Joi.string().valid("active", "draft", "archived").optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).optional(),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-_]+$/).optional(),
  description: Joi.string().trim().min(10).max(5000).optional(),
  price: Joi.number().min(0).optional(),
  compareAtPrice: Joi.number().min(0).optional(),
  costPerItem: Joi.number().min(0).optional(),
  sku: Joi.string().trim().uppercase().optional(),
  category: Joi.string().hex().length(24).optional(),
  subcategory: Joi.string().hex().length(24).optional(),
  brand: Joi.string().hex().length(24).optional(),
  stock: Joi.number().integer().min(0).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  attributes: Joi.array().items(
    Joi.object({
      attributeId: Joi.string().hex().length(24).required(),
      value: Joi.string().trim().required(),
    })
  ).optional(),
  isFeatured: Joi.boolean().optional(),
  status: Joi.string().valid("active", "draft", "archived").optional(),
});

