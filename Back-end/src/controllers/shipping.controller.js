import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { shippingService } from '../modules/shipping/shipping.service.js';

export const createShipping = asyncHandler(async (req, res) => {
  const shipping = await shippingService.createShipping(req.body);

  return res.status(201).json({
    success: true,
    message: 'Shipping method created successfully.',
    data: shipping,
  });
});

export const getShippingMethods = asyncHandler(async (req, res) => {
  const result = await shippingService.getShippingMethods(req.query);

  return res.status(200).json({
    success: true,
    message: 'Shipping methods retrieved successfully.',
    data: result,
  });
});

export const getShippingById = asyncHandler(async (req, res) => {
  const { shippingId } = req.params;
  const shipping = await shippingService.getShippingById(shippingId);

  if (!shipping) {
    throw new ApiError(404, 'Shipping method not found.');
  }

  return res.status(200).json({
    success: true,
    message: 'Shipping method retrieved successfully.',
    data: shipping,
  });
});

export const updateShipping = asyncHandler(async (req, res) => {
  const { shippingId } = req.params;
  const shipping = await shippingService.updateShipping(shippingId, req.body);

  if (!shipping) {
    throw new ApiError(404, 'Shipping method not found.');
  }

  return res.status(200).json({
    success: true,
    message: 'Shipping method updated successfully.',
    data: shipping,
  });
});

export const deleteShipping = asyncHandler(async (req, res) => {
  const { shippingId } = req.params;
  const shipping = await shippingService.deleteShipping(shippingId);

  if (!shipping) {
    throw new ApiError(404, 'Shipping method not found.');
  }

  return res.status(200).json({
    success: true,
    message: 'Shipping method deleted successfully.',
    data: shipping,
  });
});

