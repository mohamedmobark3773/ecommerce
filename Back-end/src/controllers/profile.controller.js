import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Profile } from '../models/profile.model.js';

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user?._id });
  if (!profile) throw new ApiError(404, 'Profile not found.');
  return res.status(200).json({ success: true, message: 'Profile retrieved successfully.', data: profile });
});

export const createProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.create({ ...req.body, user: req.user?._id });
  return res.status(201).json({ success: true, message: 'Profile created successfully.', data: profile });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate({ user: req.user?._id }, req.body, { new: true, runValidators: true });
  if (!profile) throw new ApiError(404, 'Profile not found.');
  return res.status(200).json({ success: true, message: 'Profile updated successfully.', data: profile });
});

