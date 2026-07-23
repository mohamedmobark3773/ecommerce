import { Router } from "express";
import {
  createSeller,
  getSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
} from "./seller.controller.js";
import { createSellerValidator, updateSellerValidator, sellerIdValidator } from "./seller.validator.js";

const router = Router();

router.route("/")
  .post(createSellerValidator, createSeller)
  .get(getSellers);

router.route("/:sellerId")
  .get(sellerIdValidator, getSellerById)
  .put(sellerIdValidator, updateSellerValidator, updateSeller)
  .delete(sellerIdValidator, deleteSeller);

export default router;

