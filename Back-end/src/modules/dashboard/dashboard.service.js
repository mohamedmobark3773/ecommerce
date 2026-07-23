import { dashboardRepository } from "./dashboard.repository.js";
import { DashboardDTO } from "./dashboard.dto.js";

class DashboardService {
  async getDashboardStats(userId) {
    const stats = await dashboardRepository.getStats(userId);
    return DashboardDTO.transform(stats);
  }

  async refreshDashboardStats(userId, statsData) {
    const stats = await dashboardRepository.upsertStats(userId, statsData);
    return DashboardDTO.transform(stats);
  }
}

export const dashboardService = new DashboardService();

