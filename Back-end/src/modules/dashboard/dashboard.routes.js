import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { getDashboardStats, refreshDashboardStats } from "./dashboard.controller.js";
import { dashboardStatsValidator } from "./dashboard.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.use(authenticateUser);

router.route("/")
  .get(getDashboardStats)
  .post(dashboardStatsValidator, validate, refreshDashboardStats);

export default router;

