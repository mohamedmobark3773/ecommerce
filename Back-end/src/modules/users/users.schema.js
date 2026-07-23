import Joi from "joi";

export const createUserSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(72).required(),
  role: Joi.string().valid("super_admin", "admin", "moderator", "user", "seller").optional(),
  status: Joi.string().valid("active", "inactive", "suspended").optional(),
  isEmailVerified: Joi.boolean().optional(),
  phone: Joi.string().trim().max(20).optional(),
  avatar: Joi.string().trim().optional(),
});

export const updateUserSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).optional(),
  email: Joi.string().trim().email().optional(),
  password: Joi.string().trim().min(6).max(72).optional(),
  role: Joi.string().valid("super_admin", "admin", "moderator", "user", "seller").optional(),
  status: Joi.string().valid("active", "inactive", "suspended").optional(),
  isEmailVerified: Joi.boolean().optional(),
  phone: Joi.string().trim().max(20).optional(),
  avatar: Joi.string().trim().optional(),
}).min(1);

