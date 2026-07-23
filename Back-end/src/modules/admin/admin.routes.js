import { Router } from "express";
import { authenticateUser, checkUserRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../validators/base.validator.js";
import {
  getSettings,
  updateSettings,
  getUsers,
  updateUserStatus,
  updateUserRole,
} from "./admin.controller.js";
import {
  updateSettingsValidator,
  updateUserStatusValidator,
  updateUserRoleValidator,
  getUsersQueryValidator,
} from "./admin.validator.js";

const router = Router();

router.use(authenticateUser, checkUserRole);

router.route("/settings")
  .get(getSettings)
  .put(updateSettingsValidator, validate, updateSettings);

router.route("/users")
  .get(getUsersQueryValidator, validate, getUsers);

router.patch("/users/:userId/status", updateUserStatusValidator, validate, updateUserStatus);
router.patch("/users/:userId/role", updateUserRoleValidator, validate, updateUserRole);

export default router;
