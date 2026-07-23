import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { dashboardService } from "./dashboard.service.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats(req.user._id);

  return res.status(200).json({
    success: true,
    message: "Dashboard stats retrieved successfully.",
    data: stats,
  });
});

export const refreshDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.refreshDashboardStats(req.user._id, req.body);

  return res.status(200).json({
    success: true,
    message: "Dashboard stats refreshed successfully.",
    data: stats,
  });
});

