import Joi from 'joi';

export const createChatRoomSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  participants: Joi.array().items(Joi.string().hex().length(24)).optional(),
  type: Joi.string().valid('direct', 'group').optional(),
  status: Joi.string().valid('active', 'archived').optional(),
  createdBy: Joi.string().hex().length(24).optional(),
});

export const updateChatRoomSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  participants: Joi.array().items(Joi.string().hex().length(24)).optional(),
  type: Joi.string().valid('direct', 'group').optional(),
  status: Joi.string().valid('active', 'archived').optional(),
  createdBy: Joi.string().hex().length(24).optional(),
}).min(1);

