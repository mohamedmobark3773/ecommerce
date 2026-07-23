export class MessageDTO {
  constructor(message) {
    this.id = message._id;
    this.conversationId = message.conversationId;
    this.sender = message.sender;
    this.content = message.content;
    this.type = message.type;
    this.isRead = message.isRead;
    this.isDeleted = message.isDeleted;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }

  static transform(message) {
    if (!message) return null;
    if (Array.isArray(message)) {
      return message.map((item) => new MessageDTO(item));
    }
    return new MessageDTO(message);
  }

  static toDatabase(data) {
    return {
      conversationId: data.conversationId,
      sender: data.sender,
      content: data.content ? data.content.trim() : undefined,
      type: data.type || "text",
      isRead: data.isRead !== undefined ? !!data.isRead : false,
      isDeleted: data.isDeleted !== undefined ? !!data.isDeleted : false,
    };
  }
}

