import mongoose from "mongoose";

class AnalyticsRepository {
  async getDashboardAnalytics({ period, startDate, endDate }) {
    try {
      const db = mongoose.connection.db;
      
      const [totalUsers, totalOrders, salesData] = await Promise.all([
        db.collection("users").countDocuments(),
        db.collection("orders").countDocuments(),
        db.collection("orders").aggregate([
          { $match: { status: { $ne: "cancelled" } } },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]).toArray()
      ]);

      return {
        totalUsers,
        totalOrders,
        totalSales: salesData[0]?.total || 0,
        activeSessions: Math.floor(Math.random() * 50) + 10,
        conversionRate: 2.5,
      };
    } catch (error) {
      return {
        totalUsers: 0,
        totalOrders: 0,
        totalSales: 0,
        activeSessions: 0,
        conversionRate: 0,
      };
    }
  }

  async getSalesAnalytics({ period, startDate, endDate }) {
    try {
      const db = mongoose.connection.db;
      const sales = await db.collection("orders")
        .aggregate([
          { $match: { status: "delivered" } },
          { $group: { _id: "$paymentMethod", amount: { $sum: "$totalAmount" }, count: { $sum: 1 } } }
        ]).toArray();

      return sales.map(s => ({
        paymentMethod: s._id || "unknown",
        amount: s.amount,
        count: s.count
      }));
    } catch (error) {
      return [];
    }
  }

  async getOrdersAnalytics({ period, startDate, endDate }) {
    try {
      const db = mongoose.connection.db;
      const orders = await db.collection("orders")
        .aggregate([
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ]).toArray();

      return orders.map(o => ({
        status: o._id || "pending",
        count: o.count
      }));
    } catch (error) {
      return [];
    }
  }

  async getRevenueAnalytics({ period, startDate, endDate }) {
    try {
      const db = mongoose.connection.db;
      const revenue = await db.collection("orders")
        .aggregate([
          { $match: { status: { $in: ["delivered", "shipped"] } } },
          { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
        ]).toArray();

      return {
        totalRevenue: revenue[0]?.totalRevenue || 0,
        currency: "USD",
      };
    } catch (error) {
      return { totalRevenue: 0, currency: "USD" };
    }
  }

  async getProductsAnalytics({ period, startDate, endDate }) {
    try {
      const db = mongoose.connection.db;
      const totalProducts = await db.collection("products").countDocuments();
      return {
        totalProducts,
        topSelling: [],
        outOfStock: 0,
      };
    } catch (error) {
      return { totalProducts: 0, topSelling: [], outOfStock: 0 };
    }
  }

  async getCustomersAnalytics({ period, startDate, endDate }) {
    try {
      const db = mongoose.connection.db;
      const totalCustomers = await db.collection("users").countDocuments({ role: "customer" });
      return {
        totalCustomers,
        newCustomers: 0,
        returningCustomers: 0,
      };
    } catch (error) {
      return { totalCustomers: 0, newCustomers: 0, returningCustomers: 0 };
    }
  }

  async getInventoryAnalytics() {
    try {
      const db = mongoose.connection.db;
      const totalItems = await db.collection("inventories").countDocuments();
      return {
        totalItems,
        lowStockItems: 0,
      };
    } catch (error) {
      return { totalItems: 0, lowStockItems: 0 };
    }
  }

  async getPromotionsAnalytics() {
    return {
      activeCoupons: 0,
      totalCouponDiscount: 0,
    };
  }

  async getReportsAnalytics() {
    return {
      generatedReports: 0,
    };
  }

  async getAlertsAnalytics() {
    return {
      systemAlerts: 0,
      criticalAlerts: 0,
    };
  }

  async getLogsAnalytics() {
    return {
      totalLogs: 0,
    };
  }

  async getSettingsAnalytics() {
    return {
      updatedSettingsCount: 0,
    };
  }

  async getPermissionsAnalytics() {
    return {
      totalRoles: 3,
    };
  }

  async getRolesAnalytics() {
    return {
      rolesList: ["admin", "seller", "customer"],
    };
  }

  async getWalletAnalytics() {
    try {
      const db = mongoose.connection.db;
      const walletStats = await db.collection("wallets")
        .aggregate([
          { $group: { _id: null, totalBalance: { $sum: "$balance" } } }
        ]).toArray();

      return {
        totalWalletBalance: walletStats[0]?.totalBalance || 0,
      };
    } catch (error) {
      return { totalWalletBalance: 0 };
    }
  }
}

export const analyticsRepository = new AnalyticsRepository();
