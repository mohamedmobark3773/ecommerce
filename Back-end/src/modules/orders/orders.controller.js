import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { ordersService } from "./orders.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  const order = await ordersService.createOrder(req.body);

  return res.status(201).json({
    success: true,
    message: "Order created successfully.",
    data: order,
  });
});

export const getOrders = asyncHandler(async (req, res) => {
  const result = await ordersService.getOrders(req.query);

  return res.status(200).json({
    success: true,
    message: "Orders retrieved successfully.",
    data: result,
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await ordersService.getOrderById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Order retrieved successfully.",
    data: order,
  });
});

export const updateOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await ordersService.updateOrder(orderId, req.body);

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Order updated successfully.",
    data: order,
  });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await ordersService.deleteOrder(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Order deleted successfully.",
    data: order,
  });
});

