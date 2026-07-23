import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { sellersService } from "./seller.service.js";

export const createSeller = asyncHandler(async (req, res) => {
  const seller = await sellersService.createSeller({ ...req.body, user: req.body.user || req.user?._id });

  return res.status(201).json({
    success: true,
    message: "Seller created successfully.",
    data: seller,
  });
});

export const getSellers = asyncHandler(async (req, res) => {
  const result = await sellersService.getSellers(req.query);

  return res.status(200).json({
    success: true,
    message: "Sellers retrieved successfully.",
    data: result,
  });
});

export const getSellerById = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;
  const seller = await sellersService.getSellerById(sellerId);

  if (!seller) {
    throw new ApiError(404, "Seller not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Seller retrieved successfully.",
    data: seller,
  });
});

export const updateSeller = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;
  const seller = await sellersService.updateSeller(sellerId, req.body);

  if (!seller) {
    throw new ApiError(404, "Seller not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Seller updated successfully.",
    data: seller,
  });
});

export const deleteSeller = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;
  const seller = await sellersService.deleteSeller(sellerId);

  if (!seller) {
    throw new ApiError(404, "Seller not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Seller deleted successfully.",
    data: seller,
  });
});

