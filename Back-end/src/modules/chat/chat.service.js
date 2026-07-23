import { chatRepository } from "./chat.repository.js";
import { ChatDTO } from "./chat.dto.js";

class ChatService {
  async createChat(userId, chatData) {
    const participantId = chatData.participantId;
    if (!participantId || participantId.toString() === userId.toString()) {
      throw new Error("A valid participant id is required.");
    }

    const existingChat = await chatRepository.findOne({
      isActive: true,
      participants: { $all: [userId, participantId] },
    });

    if (existingChat) {
      return ChatDTO.transform(existingChat);
    }

    const formattedData = ChatDTO.toDatabase({
      ...chatData,
      participants: [userId, participantId],
      createdBy: userId,
    });

    const chat = await chatRepository.create(formattedData);
    return ChatDTO.transform(chat);
  }

  async getChats(userId, query = {}) {
    const filter = {
      participants: userId,
      isActive: true,
    };

    const options = {};

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await chatRepository.findAll(filter, options);
    return {
      ...result,
      chats: ChatDTO.transform(result.chats),
    };
  }

  async getChatById(chatId, userId) {
    const chat = await chatRepository.findOne({
      _id: chatId,
      participants: userId,
      isActive: true,
    });

    return ChatDTO.transform(chat);
  }

  async sendMessage(chatId, userId, messageData) {
    const chat = await chatRepository.findOne({
      _id: chatId,
      participants: userId,
      isActive: true,
    });

    if (!chat) {
      return null;
    }

    const messagePayload = {
      sender: userId,
      content: messageData.content.trim(),
      type: messageData.type || "text",
      readBy: [userId],
    };

    const updatedChat = await chatRepository.addMessage(chatId, messagePayload);
    return ChatDTO.transform(updatedChat);
  }

  async markChatAsRead(chatId, userId) {
    const chat = await chatRepository.findOne({
      _id: chatId,
      participants: userId,
      isActive: true,
    });

    if (!chat) {
      return null;
    }

    const updatedChat = await chatRepository.markMessagesAsRead(chatId, userId);
    return ChatDTO.transform(updatedChat);
  }

  async deleteChat(chatId, userId) {
    const chat = await chatRepository.findOne({
      _id: chatId,
      participants: userId,
      isActive: true,
    });

    if (!chat) {
      return null;
    }

    const updatedChat = await chatRepository.update(chatId, { isActive: false });
    return ChatDTO.transform(updatedChat);
  }
}

export const chatService = new ChatService();

