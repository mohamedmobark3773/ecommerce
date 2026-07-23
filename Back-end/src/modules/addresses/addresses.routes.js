import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from "./addresses.controller.js";
import {
  createAddressValidator,
  updateAddressValidator,
  addressIdValidator
} from "./addresses.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.use(authenticateUser);

router.route("/")
  .post(createAddressValidator, validate, createAddress)
  .get(getAddresses);

router.route("/:addressId")
  .get(addressIdValidator, getAddressById)
  .put(addressIdValidator, updateAddressValidator, updateAddress)
  .delete(addressIdValidator, deleteAddress);

router.patch("/:addressId/default", addressIdValidator, setDefaultAddress);

export default router;
