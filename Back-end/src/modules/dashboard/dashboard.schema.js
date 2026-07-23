import Joi from "joi";

export const dashboardStatsSchema = Joi.object({
  totalOrders: Joi.number().min(0).optional(),
  totalRevenue: Joi.number().min(0).optional(),
  totalProducts: Joi.number().min(0).optional(),
  totalCustomers: Joi.number().min(0).optional(),
});

