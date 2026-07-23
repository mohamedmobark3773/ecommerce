import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { addressesService } from "./addresses.service.js";

export const createAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const addressData = req.body;

  const address = await addressesService.createAddress(userId, addressData);

  return res.status(201).json({
    success: true,
    message: "Address created successfully.",
    data: address,
  });
});

export const getAddresses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const addresses = await addressesService.getAddressesByUserId(userId);

  return res.status(200).json({
    success: true,
    message: "Addresses retrieved successfully.",
    data: addresses,
  });
});

export const getAddressById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { addressId } = req.params;

  const address = await addressesService.getAddressById(addressId, userId);

  if (!address) {
    throw new ApiError(404, "Address not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Address retrieved successfully.",
    data: address,
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { addressId } = req.params;
  const addressData = req.body;

  const address = await addressesService.updateAddress(addressId, userId, addressData);

  if (!address) {
    throw new ApiError(404, "Address not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Address updated successfully.",
    data: address,
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { addressId } = req.params;

  const result = await addressesService.deleteAddress(addressId, userId);

  if (!result) {
    throw new ApiError(404, "Address not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Address deleted successfully.",
  });
});

export const setDefaultAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { addressId } = req.params;

  const address = await addressesService.setDefaultAddress(addressId, userId);

  if (!address) {
    throw new ApiError(404, "Address not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Address set as default successfully.",
    data: address,
  });
});
