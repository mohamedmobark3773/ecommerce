import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Loyalty } from '../models/loyalty.model.js';

export const createLoyaltyPoint = asyncHandler(async (req, res) => {
  const loyalty = await Loyalty.create(req.body);
  return res.status(201).json({ success: true, message: 'Loyalty points created successfully.', data: loyalty });
});

export const getLoyaltyPoints = asyncHandler(async (req, res) => {
  const loyaltyPoints = await Loyalty.find(req.query);
  return res.status(200).json({ success: true, message: 'Loyalty points retrieved successfully.', data: loyaltyPoints });
});

export const getLoyaltyPointById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const loyalty = await Loyalty.findById(id);
  if (!loyalty) throw new ApiError(404, 'Loyalty record not found.');
  return res.status(200).json({ success: true, message: 'Loyalty points retrieved successfully.', data: loyalty });
});

