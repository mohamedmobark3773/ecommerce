import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { analyticsService } from "./analytics.service.js";

export const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getDashboardAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Dashboard analytics retrieved successfully.",
    data,
  });
});

export const getSalesAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getSalesAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Sales analytics retrieved successfully.",
    data,
  });
});

export const getOrdersAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getOrdersAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Orders analytics retrieved successfully.",
    data,
  });
});

export const getRevenueAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getRevenueAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Revenue analytics retrieved successfully.",
    data,
  });
});

export const getProductsAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getProductsAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Products analytics retrieved successfully.",
    data,
  });
});

export const getCustomersAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getCustomersAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Customers analytics retrieved successfully.",
    data,
  });
});

export const getInventoryAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getInventoryAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Inventory analytics retrieved successfully.",
    data,
  });
});

export const getPromotionsAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getPromotionsAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Promotions analytics retrieved successfully.",
    data,
  });
});

export const getReportsAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getReportsAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Reports analytics retrieved successfully.",
    data,
  });
});

export const getAlertsAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getAlertsAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Alerts analytics retrieved successfully.",
    data,
  });
});

export const getLogsAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getLogsAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Logs analytics retrieved successfully.",
    data,
  });
});

export const getSettingsAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getSettingsAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Settings analytics retrieved successfully.",
    data,
  });
});

export const getPermissionsAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getPermissionsAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Permissions analytics retrieved successfully.",
    data,
  });
});

export const getRolesAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getRolesAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Roles analytics retrieved successfully.",
    data,
  });
});

export const getWalletAnalytics = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  const data = await analyticsService.getWalletAnalytics({ period, startDate, endDate });

  return res.status(200).json({
    success: true,
    message: "Wallet analytics retrieved successfully.",
    data,
  });
});
