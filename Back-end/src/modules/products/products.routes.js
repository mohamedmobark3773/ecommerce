import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./products.controller.js";
import { createProductValidator, updateProductValidator, productIdValidator } from "./products.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.route("/")
  .post(createProductValidator, validate, createProduct)
  .get(getProducts);

router.route("/:productId")
  .get(productIdValidator, getProductById)
  .put(productIdValidator, updateProductValidator, validate, updateProduct)
  .delete(productIdValidator, deleteProduct);

export default router;

