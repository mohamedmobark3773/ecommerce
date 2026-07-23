import { adminRepository } from "./admin.repository.js";
import { AdminSettingsDTO, AdminUserDTO } from "./admin.dto.js";

class AdminService {
  async getSettings() {
    const settings = await adminRepository.getSettings();
    return AdminSettingsDTO.transform(settings);
  }

  async updateSettings(settingsData) {
    const settings = await adminRepository.updateSettings(settingsData);
    return AdminSettingsDTO.transform(settings);
  }

  async getUsers(queryParams) {
    const { users, total, page, limit } = await adminRepository.getUsers(queryParams);
    return {
      users: AdminUserDTO.transform(users),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateUserStatus(userId, status) {
    const user = await adminRepository.updateUserStatus(userId, status);
    if (!user) return null;
    return AdminUserDTO.transform(user);
  }

  async updateUserRole(userId, role) {
    const user = await adminRepository.updateUserRole(userId, role);
    if (!user) return null;
    return AdminUserDTO.transform(user);
  }
}

export const adminService = new AdminService();
