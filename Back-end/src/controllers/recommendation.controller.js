import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';

export const getRecommendations = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, message: 'Recommendations retrieved successfully.', data: [] });
});

