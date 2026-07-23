import { Chat } from "./chat.model.js";

class ChatRepository {
  async create(chatData) {
    return await Chat.create(chatData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { updatedAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [chats, total] = await Promise.all([
      Chat.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("participants", "name email")
        .populate("messages.sender", "name email"),
      Chat.countDocuments(filter),
    ]);

    return {
      chats,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(chatId) {
    return await Chat.findById(chatId)
      .populate("participants", "name email")
      .populate("messages.sender", "name email");
  }

  async findOne(filter) {
    return await Chat.findOne(filter)
      .populate("participants", "name email")
      .populate("messages.sender", "name email");
  }

  async update(chatId, chatData) {
    return await Chat.findByIdAndUpdate(chatId, { $set: chatData }, { new: true, runValidators: true })
      .populate("participants", "name email")
      .populate("messages.sender", "name email");
  }

  async addMessage(chatId, messageData) {
    return await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: messageData },
        $set: {
          lastMessage: messageData.content,
          lastMessageAt: new Date(),
        },
      },
      { new: true, runValidators: true }
    )
      .populate("participants", "name email")
      .populate("messages.sender", "name email");
  }

  async markMessagesAsRead(chatId, userId) {
    const chat = await Chat.findById(chatId);
    if (!chat) return null;

    chat.messages.forEach((message) => {
      if (!message.readBy.some((reader) => reader.toString() === userId.toString())) {
        message.readBy.push(userId);
      }
    });

    await chat.save();
    return await chat.populate("participants", "name email").populate("messages.sender", "name email");
  }

  async delete(chatId) {
    return await Chat.findByIdAndDelete(chatId);
  }
}

export const chatRepository = new ChatRepository();

