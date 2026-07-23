import { Router } from "express";
import {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} from "./orderItems.controller.js";
import { createOrderItemValidator, updateOrderItemValidator, orderItemIdValidator } from "./orderItems.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createOrderItemValidator, validate, createOrderItem)
  .get(getOrderItems);

router.route("/:orderItemId")
  .get(orderItemIdValidator, getOrderItemById)
  .put(orderItemIdValidator, updateOrderItemValidator, validate, updateOrderItem)
  .delete(orderItemIdValidator, deleteOrderItem);

export default router;

