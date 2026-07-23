import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../validators/base.validator.js";
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "./brands.controller.js";
import {
  createBrandValidator,
  updateBrandValidator,
  brandIdValidator,
} from "./brands.validator.js";

const router = Router();

router.route("/")
  .get(getBrands)
  .post(authenticateUser, createBrandValidator, validate, createBrand);

router.route("/:brandId")
  .get(brandIdValidator, getBrandById)
  .put(authenticateUser, brandIdValidator, updateBrandValidator, updateBrand)
  .delete(authenticateUser, brandIdValidator, deleteBrand);

export default router;

