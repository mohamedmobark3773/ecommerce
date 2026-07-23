import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../validators/base.validator.js";
import {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cart.controller.js";
import {
  addToCartValidator,
  updateCartItemValidator,
  cartItemIdValidator,
} from "./cart.validator.js";

const router = Router();

router.use(authenticateUser);

router.route("/")
  .get(getCart)
  .post(addToCartValidator, validate, addItemToCart)
  .delete(clearCart);

router.route("/:cartItemId")
  .put(cartItemIdValidator, updateCartItemValidator, updateCartItem)
  .delete(cartItemIdValidator, removeCartItem);

export default router;

