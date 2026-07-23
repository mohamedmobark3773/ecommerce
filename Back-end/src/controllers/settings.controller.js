import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { Settings } from '../models/settings.model.js';

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.findOne();
  return res.status(200).json({ success: true, message: 'Settings retrieved successfully.', data: settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
  return res.status(200).json({ success: true, message: 'Settings updated successfully.', data: settings });
});

