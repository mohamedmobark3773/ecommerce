import { AdminSettings } from "./admin.model.js";
import { User } from "../users/users.model.js";

class AdminRepository {
  async getSettings() {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create({});
    }
    return settings;
  }

  async updateSettings(settingsData) {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = new AdminSettings({});
    }
    Object.assign(settings, settingsData);
    return await settings.save();
  }

  async getUsers({ page = 1, limit = 10, search = "", role, status, sort = "-createdAt" }) {
    const query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      query.role = role;
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query).sort(sort).skip(skip).limit(limit),
      User.countDocuments(query),
    ]);

    return { users, total, page, limit };
  }

  async findUserById(userId) {
    return await User.findById(userId);
  }

  async updateUserStatus(userId, status) {
    return await User.findByIdAndUpdate(userId, { $set: { status } }, { new: true });
  }

  async updateUserRole(userId, role) {
    return await User.findByIdAndUpdate(userId, { $set: { role } }, { new: true });
  }
}

export const adminRepository = new AdminRepository();
