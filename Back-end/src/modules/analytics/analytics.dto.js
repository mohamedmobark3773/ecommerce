// ---------------------------------------------------------------------------
// Analytics DTOs
// ---------------------------------------------------------------------------
// Each class maps a raw repository result to a stable, documented shape that
// the controller layer can safely return to API consumers.
// Every class follows the same pattern:
//   • constructor — maps fields with sensible defaults
//   • static transform(data) — null-guards and returns a new DTO instance
//   • static transformList(items) — maps an array, filtering out nulls
// ---------------------------------------------------------------------------

// ── Dashboard ──────────────────────────────────────────────────────────────

export class DashboardAnalyticsDTO {
  constructor(data) {
    this.totalUsers = data.totalUsers ?? 0;
    this.totalOrders = data.totalOrders ?? 0;
    this.totalSales = data.totalSales ?? 0;
    this.activeSessions = data.activeSessions ?? 0;
    this.conversionRate = data.conversionRate ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new DashboardAnalyticsDTO(data);
  }
}

// ── Sales ──────────────────────────────────────────────────────────────────

export class SalesItemDTO {
  constructor(item) {
    this.paymentMethod = item.paymentMethod ?? "unknown";
    this.amount = item.amount ?? 0;
    this.count = item.count ?? 0;
  }

  static transform(item) {
    if (!item) return null;
    return new SalesItemDTO(item);
  }

  static transformList(items = []) {
    return items.map((i) => SalesItemDTO.transform(i)).filter(Boolean);
  }
}

// ── Orders ─────────────────────────────────────────────────────────────────

export class OrdersItemDTO {
  constructor(item) {
    this.status = item.status ?? "pending";
    this.count = item.count ?? 0;
  }

  static transform(item) {
    if (!item) return null;
    return new OrdersItemDTO(item);
  }

  static transformList(items = []) {
    return items.map((i) => OrdersItemDTO.transform(i)).filter(Boolean);
  }
}

// ── Revenue ────────────────────────────────────────────────────────────────

export class RevenueAnalyticsDTO {
  constructor(data) {
    this.totalRevenue = data.totalRevenue ?? 0;
    this.currency = data.currency ?? "USD";
  }

  static transform(data) {
    if (!data) return null;
    return new RevenueAnalyticsDTO(data);
  }
}

// ── Products ───────────────────────────────────────────────────────────────

export class ProductsAnalyticsDTO {
  constructor(data) {
    this.totalProducts = data.totalProducts ?? 0;
    this.topSelling = data.topSelling ?? [];
    this.outOfStock = data.outOfStock ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new ProductsAnalyticsDTO(data);
  }
}

// ── Customers ──────────────────────────────────────────────────────────────

export class CustomersAnalyticsDTO {
  constructor(data) {
    this.totalCustomers = data.totalCustomers ?? 0;
    this.newCustomers = data.newCustomers ?? 0;
    this.returningCustomers = data.returningCustomers ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new CustomersAnalyticsDTO(data);
  }
}

// ── Inventory ──────────────────────────────────────────────────────────────

export class InventoryAnalyticsDTO {
  constructor(data) {
    this.totalItems = data.totalItems ?? 0;
    this.lowStockItems = data.lowStockItems ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new InventoryAnalyticsDTO(data);
  }
}

// ── Promotions ─────────────────────────────────────────────────────────────

export class PromotionsAnalyticsDTO {
  constructor(data) {
    this.activeCoupons = data.activeCoupons ?? 0;
    this.totalCouponDiscount = data.totalCouponDiscount ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new PromotionsAnalyticsDTO(data);
  }
}

// ── Reports ────────────────────────────────────────────────────────────────

export class ReportsAnalyticsDTO {
  constructor(data) {
    this.generatedReports = data.generatedReports ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new ReportsAnalyticsDTO(data);
  }
}

// ── Alerts ─────────────────────────────────────────────────────────────────

export class AlertsAnalyticsDTO {
  constructor(data) {
    this.systemAlerts = data.systemAlerts ?? 0;
    this.criticalAlerts = data.criticalAlerts ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new AlertsAnalyticsDTO(data);
  }
}

// ── Logs ───────────────────────────────────────────────────────────────────

export class LogsAnalyticsDTO {
  constructor(data) {
    this.totalLogs = data.totalLogs ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new LogsAnalyticsDTO(data);
  }
}

// ── Settings ───────────────────────────────────────────────────────────────

export class SettingsAnalyticsDTO {
  constructor(data) {
    this.updatedSettingsCount = data.updatedSettingsCount ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new SettingsAnalyticsDTO(data);
  }
}

// ── Permissions ────────────────────────────────────────────────────────────

export class PermissionsAnalyticsDTO {
  constructor(data) {
    this.totalRoles = data.totalRoles ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new PermissionsAnalyticsDTO(data);
  }
}

// ── Roles ──────────────────────────────────────────────────────────────────

export class RolesAnalyticsDTO {
  constructor(data) {
    this.rolesList = data.rolesList ?? [];
  }

  static transform(data) {
    if (!data) return null;
    return new RolesAnalyticsDTO(data);
  }
}

// ── Wallet ─────────────────────────────────────────────────────────────────

export class WalletAnalyticsDTO {
  constructor(data) {
    this.totalWalletBalance = data.totalWalletBalance ?? 0;
  }

  static transform(data) {
    if (!data) return null;
    return new WalletAnalyticsDTO(data);
  }
}

// ---------------------------------------------------------------------------
// Legacy / generic passthrough — kept for backwards compatibility
// ---------------------------------------------------------------------------
export class AnalyticsDTO {
  static transform(data) {
    if (!data) return null;
    return data;
  }
}
