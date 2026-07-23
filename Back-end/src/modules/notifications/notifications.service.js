import { notificationsRepository } from "./notifications.repository.js";
import { NotificationDTO } from "./notifications.dto.js";

class NotificationsService {
  async createNotification(notificationData) {
    const formattedData = NotificationDTO.toDatabase(notificationData);
    const notification = await notificationsRepository.create(formattedData);
    return NotificationDTO.transform(notification);
  }

  async getNotifications(userId, query = {}) {
    const filter = { user: userId };
    const options = {};

    if (query.isRead !== undefined) filter.isRead = query.isRead === "true" || query.isRead === true;
    if (query.isArchived !== undefined) filter.isArchived = query.isArchived === "true" || query.isArchived === true;
    if (query.type) filter.type = query.type;
    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await notificationsRepository.findAll(filter, options);
    return {
      ...result,
      notifications: NotificationDTO.transform(result.notifications),
    };
  }

  async getNotificationById(notificationId, userId) {
    const notification = await notificationsRepository.findOne({ _id: notificationId, user: userId });
    return NotificationDTO.transform(notification);
  }

  async markAsRead(notificationId, userId) {
    const notification = await notificationsRepository.update(notificationId, { isRead: true });
    return NotificationDTO.transform(notification);
  }

  async deleteNotification(notificationId, userId) {
    const notification = await notificationsRepository.delete(notificationId);
    return NotificationDTO.transform(notification);
  }
}

export const notificationsService = new NotificationsService();

