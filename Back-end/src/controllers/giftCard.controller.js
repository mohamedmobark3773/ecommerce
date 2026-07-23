import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { GiftCard } from '../models/giftCard.model.js';

export const createGiftCard = asyncHandler(async (req, res) => {
  const giftCard = await GiftCard.create(req.body);
  return res.status(201).json({ success: true, message: 'Gift card created successfully.', data: giftCard });
});

export const getGiftCards = asyncHandler(async (req, res) => {
  const giftCards = await GiftCard.find(req.query);
  return res.status(200).json({ success: true, message: 'Gift cards retrieved successfully.', data: giftCards });
});

export const getGiftCardById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const giftCard = await GiftCard.findById(id);
  if (!giftCard) throw new ApiError(404, 'Gift card not found.');
  return res.status(200).json({ success: true, message: 'Gift card retrieved successfully.', data: giftCard });
});

export const updateGiftCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const giftCard = await GiftCard.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!giftCard) throw new ApiError(404, 'Gift card not found.');
  return res.status(200).json({ success: true, message: 'Gift card updated successfully.', data: giftCard });
});

export const deleteGiftCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const giftCard = await GiftCard.findByIdAndDelete(id);
  if (!giftCard) throw new ApiError(404, 'Gift card not found.');
  return res.status(200).json({ success: true, message: 'Gift card deleted successfully.' });
});

