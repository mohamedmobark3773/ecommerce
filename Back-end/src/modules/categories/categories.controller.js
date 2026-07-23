import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import * as categoriesServiceModule from "./categories.service.js";

const categoriesService = categoriesServiceModule.categoriesService ?? categoriesServiceModule.default ?? categoriesServiceModule;

const getCategoriesService = () => {
  if (!categoriesService || typeof categoriesService.createCategory !== "function") {
    throw new ApiError(500, "Category service is not available.");
  }

  return categoriesService;
};

export const createCategory = asyncHandler(async (req, res) => {
  const service = getCategoriesService();
  const category = await service.createCategory(req.body);

  return res.status(201).json({
    success: true,
    message: "Category created successfully.",
    data: category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const service = getCategoriesService();
  const query = req.query ?? {};
  const categories = await service.getCategories(query);

  return res.status(200).json({
    success: true,
    message: "Categories retrieved successfully.",
    data: categories,
  });
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const service = getCategoriesService();
  const { categoryId } = req.params;
  const category = await service.getCategoryById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Category retrieved successfully.",
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const service = getCategoriesService();
  const { categoryId } = req.params;
  const category = await service.updateCategory(categoryId, req.body);

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Category updated successfully.",
    data: category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const service = getCategoriesService();
  const { categoryId } = req.params;
  const category = await service.deleteCategory(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Category deleted successfully.",
    data: category,
  });
});

