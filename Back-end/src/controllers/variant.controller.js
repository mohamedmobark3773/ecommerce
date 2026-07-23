import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Variant } from '../models/variant.model.js';

export const createVariant = asyncHandler(async (req, res) => {
  const variant = await Variant.create(req.body);
  return res.status(201).json({ success: true, message: 'Variant created successfully.', data: variant });
});

export const getVariants = asyncHandler(async (req, res) => {
  const variants = await Variant.find(req.query);
  return res.status(200).json({ success: true, message: 'Variants retrieved successfully.', data: variants });
});

export const getVariantById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const variant = await Variant.findById(id);
  if (!variant) throw new ApiError(404, 'Variant not found.');
  return res.status(200).json({ success: true, message: 'Variant retrieved successfully.', data: variant });
});

