import { Order } from "./orders.model.js";

class OrdersRepository {
  async create(orderData) {
    return await Order.create(orderData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(filter).sort(sort).skip(skip).limit(limit).populate("items"),
      Order.countDocuments(filter),
    ]);

    return {
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(orderId) {
    return await Order.findById(orderId).populate("items");
  }

  async update(orderId, orderData) {
    return await Order.findByIdAndUpdate(orderId, { $set: orderData }, { new: true, runValidators: true }).populate("items");
  }

  async delete(orderId) {
    return await Order.findByIdAndDelete(orderId);
  }
}

export const ordersRepository = new OrdersRepository();

