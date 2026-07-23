import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';

export const handleWebhook = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, message: 'Webhook received successfully.' });
});

