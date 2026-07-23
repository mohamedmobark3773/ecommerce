import { analyticsRepository } from "./analytics.repository.js";

class AnalyticsService {
  async getDashboardAnalytics(params) {
    return await analyticsRepository.getDashboardAnalytics(params);
  }

  async getSalesAnalytics(params) {
    return await analyticsRepository.getSalesAnalytics(params);
  }

  async getOrdersAnalytics(params) {
    return await analyticsRepository.getOrdersAnalytics(params);
  }

  async getRevenueAnalytics(params) {
    return await analyticsRepository.getRevenueAnalytics(params);
  }

  async getProductsAnalytics(params) {
    return await analyticsRepository.getProductsAnalytics(params);
  }

  async getCustomersAnalytics(params) {
    return await analyticsRepository.getCustomersAnalytics(params);
  }

  async getInventoryAnalytics(params) {
    return await analyticsRepository.getInventoryAnalytics(params);
  }

  async getPromotionsAnalytics(params) {
    return await analyticsRepository.getPromotionsAnalytics(params);
  }

  async getReportsAnalytics(params) {
    return await analyticsRepository.getReportsAnalytics(params);
  }

  async getAlertsAnalytics(params) {
    return await analyticsRepository.getAlertsAnalytics(params);
  }

  async getLogsAnalytics(params) {
    return await analyticsRepository.getLogsAnalytics(params);
  }

  async getSettingsAnalytics(params) {
    return await analyticsRepository.getSettingsAnalytics(params);
  }

  async getPermissionsAnalytics(params) {
    return await analyticsRepository.getPermissionsAnalytics(params);
  }

  async getRolesAnalytics(params) {
    return await analyticsRepository.getRolesAnalytics(params);
  }

  async getWalletAnalytics(params) {
    return await analyticsRepository.getWalletAnalytics(params);
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
