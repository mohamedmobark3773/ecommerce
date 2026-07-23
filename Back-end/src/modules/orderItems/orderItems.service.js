import { orderItemsRepository } from "./orderItems.repository.js";
import { OrderItemDTO } from "./orderItems.dto.js";

class OrderItemsService {
  async createOrderItem(orderItemData) {
    const formattedData = OrderItemDTO.toDatabase(orderItemData);
    const orderItem = await orderItemsRepository.create(formattedData);
    return OrderItemDTO.transform(orderItem);
  }

  async getOrderItems(query = {}) {
    const filter = {};
    const options = {};

    if (query.order) filter.order = query.order;
    if (query.product) filter.product = query.product;
    if (query.status) filter.status = query.status;
    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await orderItemsRepository.findAll(filter, options);
    return {
      ...result,
      orderItems: OrderItemDTO.transform(result.orderItems),
    };
  }

  async getOrderItemById(orderItemId) {
    const orderItem = await orderItemsRepository.findById(orderItemId);
    return OrderItemDTO.transform(orderItem);
  }

  async updateOrderItem(orderItemId, orderItemData) {
    const formattedData = OrderItemDTO.toDatabase(orderItemData);
    const orderItem = await orderItemsRepository.update(orderItemId, formattedData);
    return OrderItemDTO.transform(orderItem);
  }

  async deleteOrderItem(orderItemId) {
    const orderItem = await orderItemsRepository.delete(orderItemId);
    return OrderItemDTO.transform(orderItem);
  }
}

export const orderItemsService = new OrderItemsService();

