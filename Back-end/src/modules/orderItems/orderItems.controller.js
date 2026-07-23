import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { orderItemsService } from "./orderItems.service.js";

export const createOrderItem = asyncHandler(async (req, res) => {
  const orderItem = await orderItemsService.createOrderItem(req.body);

  return res.status(201).json({
    success: true,
    message: "Order item created successfully.",
    data: orderItem,
  });
});

export const getOrderItems = asyncHandler(async (req, res) => {
  const result = await orderItemsService.getOrderItems(req.query);

  return res.status(200).json({
    success: true,
    message: "Order items retrieved successfully.",
    data: result,
  });
});

export const getOrderItemById = asyncHandler(async (req, res) => {
  const { orderItemId } = req.params;
  const orderItem = await orderItemsService.getOrderItemById(orderItemId);

  if (!orderItem) {
    throw new ApiError(404, "Order item not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Order item retrieved successfully.",
    data: orderItem,
  });
});

export const updateOrderItem = asyncHandler(async (req, res) => {
  const { orderItemId } = req.params;
  const orderItem = await orderItemsService.updateOrderItem(orderItemId, req.body);

  if (!orderItem) {
    throw new ApiError(404, "Order item not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Order item updated successfully.",
    data: orderItem,
  });
});

export const deleteOrderItem = asyncHandler(async (req, res) => {
  const { orderItemId } = req.params;
  const orderItem = await orderItemsService.deleteOrderItem(orderItemId);

  if (!orderItem) {
    throw new ApiError(404, "Order item not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Order item deleted successfully.",
    data: orderItem,
  });
});

