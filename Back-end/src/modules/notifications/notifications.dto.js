export class NotificationDTO {
  constructor(notification) {
    this.id = notification._id;
    this.user = notification.user;
    this.title = notification.title;
    this.message = notification.message;
    this.type = notification.type;
    this.isRead = notification.isRead;
    this.isArchived = notification.isArchived;
    this.link = notification.link;
    this.createdAt = notification.createdAt;
    this.updatedAt = notification.updatedAt;
  }

  static transform(notification) {
    if (!notification) return null;
    if (Array.isArray(notification)) {
      return notification.map((item) => new NotificationDTO(item));
    }
    return new NotificationDTO(notification);
  }

  static toDatabase(data) {
    return {
      user: data.user,
      title: data.title ? data.title.trim() : undefined,
      message: data.message ? data.message.trim() : undefined,
      type: data.type || "info",
      isRead: data.isRead !== undefined ? !!data.isRead : false,
      isArchived: data.isArchived !== undefined ? !!data.isArchived : false,
      link: data.link ? data.link.trim() : "",
    };
  }
}

