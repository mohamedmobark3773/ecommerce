import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { notificationsService } from "./notifications.service.js";

export const createNotification = asyncHandler(async (req, res) => {
  const notification = await notificationsService.createNotification({ ...req.body, user: req.user._id });

  return res.status(201).json({
    success: true,
    message: "Notification created successfully.",
    data: notification,
  });
});

export const getNotifications = asyncHandler(async (req, res) => {
  const result = await notificationsService.getNotifications(req.user._id, req.query);

  return res.status(200).json({
    success: true,
    message: "Notifications retrieved successfully.",
    data: result,
  });
});

export const getNotificationById = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const notification = await notificationsService.getNotificationById(notificationId, req.user._id);

  if (!notification) {
    throw new ApiError(404, "Notification not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Notification retrieved successfully.",
    data: notification,
  });
});

export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const notification = await notificationsService.markAsRead(notificationId, req.user._id);

  if (!notification) {
    throw new ApiError(404, "Notification not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Notification marked as read.",
    data: notification,
  });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const notification = await notificationsService.deleteNotification(notificationId, req.user._id);

  if (!notification) {
    throw new ApiError(404, "Notification not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Notification deleted successfully.",
    data: notification,
  });
});

