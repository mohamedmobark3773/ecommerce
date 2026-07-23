import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { productsService } from "./products.service.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productsService.createProduct(req.body);

  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: product,
  });
});

export const getProducts = asyncHandler(async (req, res) => {
  const result = await productsService.getProducts(req.query);

  return res.status(200).json({
    success: true,
    message: "Products retrieved successfully.",
    data: result,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await productsService.getProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Product retrieved successfully.",
    data: product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await productsService.updateProduct(productId, req.body);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    data: product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await productsService.deleteProduct(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
    data: product,
  });
});

