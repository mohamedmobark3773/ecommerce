import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import { validate } from "../../validators/base.validator.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./categories.controller.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
} from "./categories.validator.js";

const router = Router();

router.route("/")
  .get(getCategories)
  .post(authenticateUser, createCategoryValidator, validate, createCategory);

router.route("/:categoryId")
  .get(categoryIdValidator, getCategoryById)
  .put(authenticateUser, categoryIdValidator, updateCategoryValidator, updateCategory)
  .delete(authenticateUser, categoryIdValidator, deleteCategory);

export default router;

