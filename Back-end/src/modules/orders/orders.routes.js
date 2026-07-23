import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "./orders.controller.js";
import { createOrderValidator, updateOrderValidator, orderIdValidator } from "./orders.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createOrderValidator, validate, createOrder)
  .get(getOrders);

router.route("/:orderId")
  .get(orderIdValidator, getOrderById)
  .put(orderIdValidator, updateOrderValidator, validate, updateOrder)
  .delete(orderIdValidator, deleteOrder);

export default router;

