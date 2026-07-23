export class AdminSettingsDTO {
  constructor(settings) {
    this.siteName = settings.siteName;
    this.siteEmail = settings.siteEmail;
    this.supportPhone = settings.supportPhone;
    this.maintenanceMode = settings.maintenanceMode;
    this.currency = settings.currency;
    this.allowedCountries = settings.allowedCountries;
    this.taxRate = settings.taxRate;
    this.shippingFee = settings.shippingFee;
    this.updatedAt = settings.updatedAt;
  }

  static transform(settings) {
    if (!settings) return null;
    return new AdminSettingsDTO(settings);
  }
}

export class AdminUserDTO {
  constructor(user) {
    this.id = user._id;
    this.fullName = user.fullName;
    this.email = user.email;
    this.role = user.role;
    this.status = user.status;
    this.createdAt = user.createdAt;
  }

  static transform(users) {
    if (!users) return null;
    if (Array.isArray(users)) {
      return users.map((item) => new AdminUserDTO(item));
    }
    return new AdminUserDTO(users);
  }
}
