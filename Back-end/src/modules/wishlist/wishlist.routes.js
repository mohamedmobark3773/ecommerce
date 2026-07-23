import { Router } from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "./wishlist.controller.js";
import { addToWishlistValidator, removeWishlistValidator } from "./wishlist.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(addToWishlistValidator, validate, addToWishlist)
  .get(getWishlist);

router.route("/:userId/:productId")
  .delete(removeWishlistValidator, removeFromWishlist);

export default router;

