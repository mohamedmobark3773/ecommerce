import Joi from "joi";

export const createReviewSchema = Joi.object({
  user: Joi.string().hex().length(24).optional(),
  product: Joi.string().hex().length(24).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  title: Joi.string().trim().max(150).optional(),
  comment: Joi.string().trim().max(5000).optional(),
  isApproved: Joi.boolean().optional(),
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  title: Joi.string().trim().max(150).optional(),
  comment: Joi.string().trim().max(5000).optional(),
  isApproved: Joi.boolean().optional(),
});

