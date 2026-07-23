import { DashboardStats } from "./dashboard.model.js";

class DashboardRepository {
  async getStats(userId) {
    return await DashboardStats.findOne({ userId });
  }

  async upsertStats(userId, statsData) {
    return await DashboardStats.findOneAndUpdate(
      { userId },
      { $set: { ...statsData, lastUpdated: new Date() } },
      { new: true, upsert: true, runValidators: true }
    );
  }
}

export const dashboardRepository = new DashboardRepository();

