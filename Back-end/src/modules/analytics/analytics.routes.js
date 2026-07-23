import { Router } from "express";
import { authenticateUser, checkUserRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../validators/base.validator.js";
import {
  getDashboardAnalytics,
  getSalesAnalytics,
  getOrdersAnalytics,
  getRevenueAnalytics,
  getProductsAnalytics,
  getCustomersAnalytics,
  getInventoryAnalytics,
  getPromotionsAnalytics,
  getReportsAnalytics,
  getAlertsAnalytics,
  getLogsAnalytics,
  getSettingsAnalytics,
  getPermissionsAnalytics,
  getRolesAnalytics,
  getWalletAnalytics,
} from "./analytics.controller.js";
import { getAnalyticsQueryValidator } from "./analytics.validator.js";

const router = Router();

// Secure all analytics routes to Admin only
router.use(authenticateUser, checkUserRole);

router.get("/dashboard", getAnalyticsQueryValidator, validate, getDashboardAnalytics);
router.get("/sales", getAnalyticsQueryValidator, validate, getSalesAnalytics);
router.get("/orders", getAnalyticsQueryValidator, validate, getOrdersAnalytics);
router.get("/revenue", getAnalyticsQueryValidator, validate, getRevenueAnalytics);
router.get("/products", getAnalyticsQueryValidator, validate, getProductsAnalytics);
router.get("/customers", getAnalyticsQueryValidator, validate, getCustomersAnalytics);
router.get("/inventory", getAnalyticsQueryValidator, validate, getInventoryAnalytics);
router.get("/promotions", getAnalyticsQueryValidator, validate, getPromotionsAnalytics);
router.get("/reports", getAnalyticsQueryValidator, validate, getReportsAnalytics);
router.get("/alerts", getAnalyticsQueryValidator, validate, getAlertsAnalytics);
router.get("/logs", getAnalyticsQueryValidator, validate, getLogsAnalytics);
router.get("/settings", getAnalyticsQueryValidator, validate, getSettingsAnalytics);
router.get("/permissions", getAnalyticsQueryValidator, validate, getPermissionsAnalytics);
router.get("/roles", getAnalyticsQueryValidator, validate, getRolesAnalytics);
router.get("/wallet", getAnalyticsQueryValidator, validate, getWalletAnalytics);

export default router;
