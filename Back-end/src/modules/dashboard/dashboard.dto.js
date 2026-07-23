export class DashboardDTO {
  constructor(stats) {
    this.id = stats._id;
    this.userId = stats.userId;
    this.totalOrders = stats.totalOrders;
    this.totalRevenue = stats.totalRevenue;
    this.totalProducts = stats.totalProducts;
    this.totalCustomers = stats.totalCustomers;
    this.lastUpdated = stats.lastUpdated;
    this.createdAt = stats.createdAt;
    this.updatedAt = stats.updatedAt;
  }

  static transform(stats) {
    if (!stats) return null;
    if (Array.isArray(stats)) {
      return stats.map((item) => new DashboardDTO(item));
    }
    return new DashboardDTO(stats);
  }
}

