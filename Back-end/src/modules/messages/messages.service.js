import { messagesRepository } from "./messages.repository.js";
import { MessageDTO } from "./messages.dto.js";

class MessagesService {
  async createMessage(messageData) {
    const formattedData = MessageDTO.toDatabase(messageData);
    const message = await messagesRepository.create(formattedData);
    return MessageDTO.transform(message);
  }

  async getMessages(query = {}) {
    const filter = {};
    const options = {};

    if (query.conversationId) filter.conversationId = query.conversationId;
    if (query.sender) filter.sender = query.sender;
    if (query.isRead !== undefined) filter.isRead = query.isRead === "true" || query.isRead === true;
    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await messagesRepository.findAll(filter, options);
    return {
      ...result,
      messages: MessageDTO.transform(result.messages),
    };
  }

  async getMessageById(messageId) {
    const message = await messagesRepository.findById(messageId);
    return MessageDTO.transform(message);
  }

  async updateMessage(messageId, messageData) {
    const formattedData = MessageDTO.toDatabase(messageData);
    const message = await messagesRepository.update(messageId, formattedData);
    return MessageDTO.transform(message);
  }

  async deleteMessage(messageId) {
    const message = await messagesRepository.delete(messageId);
    return MessageDTO.transform(message);
  }
}

export const messagesService = new MessagesService();

