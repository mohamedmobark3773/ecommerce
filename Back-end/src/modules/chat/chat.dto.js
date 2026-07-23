export class ChatMessageDTO {
  constructor(message) {
    this.id = message._id;
    this.sender = message.sender;
    this.content = message.content;
    this.type = message.type;
    this.readBy = message.readBy || [];
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }

  static transform(message) {
    if (!message) return null;
    if (Array.isArray(message)) {
      return message.map((item) => new ChatMessageDTO(item));
    }
    return new ChatMessageDTO(message);
  }
}

export class ChatDTO {
  constructor(chat) {
    this.id = chat._id;
    this.participants = chat.participants || [];
    this.title = chat.title;
    this.createdBy = chat.createdBy;
    this.isActive = chat.isActive;
    this.lastMessage = chat.lastMessage;
    this.lastMessageAt = chat.lastMessageAt;
    this.messages = chat.messages ? ChatMessageDTO.transform(chat.messages) : [];
    this.createdAt = chat.createdAt;
    this.updatedAt = chat.updatedAt;
  }

  static transform(chat) {
    if (!chat) return null;
    if (Array.isArray(chat)) {
      return chat.map((item) => new ChatDTO(item));
    }
    return new ChatDTO(chat);
  }

  static toDatabase(data) {
    return {
      title: data.title ? data.title.trim() : undefined,
      participants: data.participants || undefined,
      createdBy: data.createdBy || undefined,
      isActive: data.isActive !== undefined ? !!data.isActive : true,
    };
  }
}

