import Joi from "joi";

export const createAddressSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
  phone: Joi.string().trim().required(),
  country: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  street: Joi.string().trim().required(),
  postalCode: Joi.string().trim().required(),
  addressType: Joi.string().valid("home", "work", "other").default("home"),
  isDefault: Joi.boolean().default(false),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional()
});

export const updateAddressSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).optional(),
  phone: Joi.string().trim().optional(),
  country: Joi.string().trim().optional(),
  state: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  street: Joi.string().trim().optional(),
  postalCode: Joi.string().trim().optional(),
  addressType: Joi.string().valid("home", "work", "other").optional(),
  isDefault: Joi.boolean().optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional()
});
