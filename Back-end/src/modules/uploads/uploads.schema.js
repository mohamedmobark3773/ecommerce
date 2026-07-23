import Joi from "joi";

export const createUploadSchema = Joi.object({
  entityType: Joi.string().trim().max(50).optional(),
  entityId: Joi.string().trim().max(100).optional(),
  altText: Joi.string().trim().max(200).optional(),
  isPrimary: Joi.boolean().optional(),
  status: Joi.string().valid("uploaded", "processing", "failed").optional(),
});

export const updateUploadSchema = Joi.object({
  entityType: Joi.string().trim().max(50).optional(),
  entityId: Joi.string().trim().max(100).optional(),
  altText: Joi.string().trim().max(200).optional(),
  isPrimary: Joi.boolean().optional(),
  status: Joi.string().valid("uploaded", "processing", "failed").optional(),
}).min(1);

