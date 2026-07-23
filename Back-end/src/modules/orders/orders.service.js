import { ordersRepository } from "./orders.repository.js";
import { OrderDTO } from "./orders.dto.js";

class OrdersService {
  async createOrder(orderData) {
    const formattedData = OrderDTO.toDatabase(orderData);
    const order = await ordersRepository.create(formattedData);
    return OrderDTO.transform(order);
  }

  async getOrders(query = {}) {
    const filter = {};
    const options = {};

    if (query.user) filter.user = query.user;
    if (query.status) filter.status = query.status;
    if (query.paymentStatus) filter.paymentStatus = query.paymentStatus;
    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await ordersRepository.findAll(filter, options);
    return {
      ...result,
      orders: OrderDTO.transform(result.orders),
    };
  }

  async getOrderById(orderId) {
    const order = await ordersRepository.findById(orderId);
    return OrderDTO.transform(order);
  }

  async updateOrder(orderId, orderData) {
    const formattedData = OrderDTO.toDatabase(orderData);
    const order = await ordersRepository.update(orderId, formattedData);
    return OrderDTO.transform(order);
  }

  async deleteOrder(orderId) {
    const order = await ordersRepository.delete(orderId);
    return OrderDTO.transform(order);
  }
}

export const ordersService = new OrdersService();

