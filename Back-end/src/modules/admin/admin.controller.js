import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { adminService } from "./admin.service.js";

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await adminService.getSettings();

  return res.status(200).json({
    success: true,
    message: "Admin settings retrieved successfully.",
    data: settings,
  });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settingsData = req.body;
  const settings = await adminService.updateSettings(settingsData);

  return res.status(200).json({
    success: true,
    message: "Admin settings updated successfully.",
    data: settings,
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, search, role, status, sort } = req.query;

  const result = await adminService.getUsers({
    page: page ? parseInt(page, 10) : undefined,
    limit: limit ? parseInt(limit, 10) : undefined,
    search,
    role,
    status,
    sort,
  });

  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully.",
    data: result,
  });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  const user = await adminService.updateUserStatus(userId, status);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res.status(200).json({
    success: true,
    message: "User status updated successfully.",
    data: user,
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const user = await adminService.updateUserRole(userId, role);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res.status(200).json({
    success: true,
    message: "User role updated successfully.",
    data: user,
  });
});
