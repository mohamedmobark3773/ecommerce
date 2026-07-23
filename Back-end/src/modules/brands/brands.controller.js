import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import * as brandsServiceModule from "./brands.service.js";

const brandsService = brandsServiceModule.brandsService ?? brandsServiceModule.default ?? brandsServiceModule;

const getBrandsService = () => {
  if (!brandsService || typeof brandsService.createBrand !== "function") {
    throw new ApiError(500, "Brand service is not available.");
  }

  return brandsService;
};

export const createBrand = asyncHandler(async (req, res) => {
  const service = getBrandsService();
  const brand = await service.createBrand(req.body);

  return res.status(201).json({
    success: true,
    message: "Brand created successfully.",
    data: brand,
  });
});

export const getBrands = asyncHandler(async (req, res) => {
  const service = getBrandsService();
  const query = req.query ?? {};
  const brands = await service.getBrands(query);

  return res.status(200).json({
    success: true,
    message: "Brands retrieved successfully.",
    data: brands,
  });
});

export const getBrandById = asyncHandler(async (req, res) => {
  const service = getBrandsService();
  const { brandId } = req.params;
  const brand = await service.getBrandById(brandId);

  if (!brand) {
    throw new ApiError(404, "Brand not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Brand retrieved successfully.",
    data: brand,
  });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const service = getBrandsService();
  const { brandId } = req.params;
  const brand = await service.updateBrand(brandId, req.body);

  if (!brand) {
    throw new ApiError(404, "Brand not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Brand updated successfully.",
    data: brand,
  });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const service = getBrandsService();
  const { brandId } = req.params;
  const brand = await service.deleteBrand(brandId);

  if (!brand) {
    throw new ApiError(404, "Brand not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Brand deleted successfully.",
    data: brand,
  });
});

