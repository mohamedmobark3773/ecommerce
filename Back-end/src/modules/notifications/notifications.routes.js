import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../validators/base.validator.js";
import {
  createNotification,
  getNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification,
} from "./notifications.controller.js";
import { createNotificationValidator, notificationIdValidator } from "./notifications.validator.js";

const router = Router();

router.use(authenticateUser);

router.route("/")
  .post(createNotificationValidator, validate, createNotification)
  .get(getNotifications);

router.route("/:notificationId")
  .get(notificationIdValidator, getNotificationById)
  .delete(notificationIdValidator, deleteNotification);

router.patch("/:notificationId/read", notificationIdValidator, validate, markNotificationAsRead);

export default router;

