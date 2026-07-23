import Joi from "joi";

export const addToCartSchema = Joi.object({
  product: Joi.string().hex().length(24).required(),
  variant: Joi.string().hex().length(24).optional(),
  quantity: Joi.number().integer().min(1).default(1),
  price: Joi.number().min(0).default(0),
  currency: Joi.string().trim().uppercase().length(3).optional(),
  subtotal: Joi.number().min(0).default(0),
});

export const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).optional(),
  subtotal: Joi.number().min(0).optional(),
});

