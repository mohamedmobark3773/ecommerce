import Joi from "joi";

export const updateSettingsSchema = Joi.object({
  siteName: Joi.string().trim().min(2).max(100).optional(),
  siteEmail: Joi.string().trim().email().optional(),
  supportPhone: Joi.string().trim().optional(),
  maintenanceMode: Joi.boolean().optional(),
  currency: Joi.string().trim().min(3).max(3).uppercase().optional(),
  allowedCountries: Joi.array().items(Joi.string().trim()).optional(),
  taxRate: Joi.number().min(0).max(100).optional(),
  shippingFee: Joi.number().min(0).optional(),
});

export const updateUserStatusSchema = Joi.object({
  status: Joi.string().trim().valid("active", "inactive", "suspended").required(),
});

export const updateUserRoleSchema = Joi.object({
  role: Joi.string().trim().valid("super_admin", "admin", "moderator", "user", "seller").required(),
});
