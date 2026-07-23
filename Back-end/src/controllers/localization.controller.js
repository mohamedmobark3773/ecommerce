import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';

export const getSupportedLanguages = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, message: 'Languages retrieved successfully.', data: [] });
});

export const getLocalization = asyncHandler(async (req, res) => {
  const { locale } = req.params;
  if (!locale) throw new ApiError(400, 'Locale is required.');
  return res.status(200).json({ success: true, message: 'Localization retrieved successfully.', data: { locale } });
});

