import { OrderItem } from "./orderItems.model.js";

class OrderItemsRepository {
  async create(orderItemData) {
    return await OrderItem.create(orderItemData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [orderItems, total] = await Promise.all([
      OrderItem.find(filter).sort(sort).skip(skip).limit(limit),
      OrderItem.countDocuments(filter),
    ]);

    return {
      orderItems,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(orderItemId) {
    return await OrderItem.findById(orderItemId);
  }

  async update(orderItemId, orderItemData) {
    return await OrderItem.findByIdAndUpdate(orderItemId, { $set: orderItemData }, { new: true, runValidators: true });
  }

  async delete(orderItemId) {
    return await OrderItem.findByIdAndDelete(orderItemId);
  }
}

export const orderItemsRepository = new OrderItemsRepository();

