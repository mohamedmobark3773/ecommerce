import Joi from "joi";

export const getAnalyticsQuerySchema = Joi.object({
  period: Joi.string().valid("daily", "weekly", "monthly", "yearly", "today", "yesterday", "last7days", "last30days", "thisMonth", "lastMonth").optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
  type: Joi.string().optional(),
});
