import { Notification } from "./notifications.model.js";

class NotificationsRepository {
  async create(notificationData) {
    return await Notification.create(notificationData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      Notification.find(filter).sort(sort).skip(skip).limit(limit),
      Notification.countDocuments(filter),
    ]);

    return {
      notifications,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(notificationId) {
    return await Notification.findById(notificationId);
  }

  async update(notificationId, notificationData) {
    return await Notification.findByIdAndUpdate(notificationId, { $set: notificationData }, { new: true, runValidators: true });
  }

  async delete(notificationId) {
    return await Notification.findByIdAndDelete(notificationId);
  }
}

export const notificationsRepository = new NotificationsRepository();

