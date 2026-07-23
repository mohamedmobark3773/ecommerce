import { Router } from "express";
import {
  createShipping,
  getShippingMethods,
  getShippingById,
  updateShipping,
  deleteShipping,
} from "./shipping.controller.js";
import { createShippingValidator, updateShippingValidator, shippingIdValidator } from "./shipping.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createShippingValidator, validate, createShipping)
  .get(getShippingMethods);

router.route("/:shippingId")
  .get(shippingIdValidator, getShippingById)
  .put(shippingIdValidator, updateShippingValidator, validate, updateShipping)
  .delete(shippingIdValidator, deleteShipping);

export default router;

