import { Router } from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "./payments.controller.js";
import {
  createPaymentValidator,
  updatePaymentValidator,
  paymentIdValidator,
} from "./payments.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createPaymentValidator, validate, createPayment)
  .get(getPayments);

router.route("/:paymentId")
  .get(paymentIdValidator, getPaymentById)
  .put(paymentIdValidator, updatePaymentValidator, validate, updatePayment)
  .delete(paymentIdValidator, deletePayment);

export default router;

