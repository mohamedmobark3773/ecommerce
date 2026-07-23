import Joi from 'joi';

export const createProfileSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  firstName: Joi.string().trim().min(1).max(100).optional(),
  lastName: Joi.string().trim().min(1).max(100).optional(),
  phone: Joi.string().trim().max(20).optional(),
  avatar: Joi.string().uri().optional(),
  address: Joi.string().trim().max(500).optional(),
});

export const updateProfileSchema = Joi.object({
  userId: Joi.string().hex().length(24).optional(),
  firstName: Joi.string().trim().min(1).max(100).optional(),
  lastName: Joi.string().trim().min(1).max(100).optional(),
  phone: Joi.string().trim().max(20).optional(),
  avatar: Joi.string().uri().optional(),
  address: Joi.string().trim().max(500).optional(),
}).min(1);

