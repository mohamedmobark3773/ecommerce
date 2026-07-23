import { Message } from "./messages.model.js";

class MessagesRepository {
  async create(messageData) {
    return await Message.create(messageData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find(filter).sort(sort).skip(skip).limit(limit),
      Message.countDocuments(filter),
    ]);

    return {
      messages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(messageId) {
    return await Message.findById(messageId);
  }

  async update(messageId, messageData) {
    return await Message.findByIdAndUpdate(messageId, { $set: messageData }, { new: true, runValidators: true });
  }

  async delete(messageId) {
    return await Message.findByIdAndDelete(messageId);
  }
}

export const messagesRepository = new MessagesRepository();

