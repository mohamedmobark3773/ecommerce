import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Refund } from '../models/refund.model.js';

export const createRefund = asyncHandler(async (req, res) => {
  const refund = await Refund.create(req.body);
  return res.status(201).json({ success: true, message: 'Refund created successfully.', data: refund });
});

export const getRefunds = asyncHandler(async (req, res) => {
  const refunds = await Refund.find(req.query);
  return res.status(200).json({ success: true, message: 'Refunds retrieved successfully.', data: refunds });
});

export const getRefundById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const refund = await Refund.findById(id);
  if (!refund) throw new ApiError(404, 'Refund not found.');
  return res.status(200).json({ success: true, message: 'Refund retrieved successfully.', data: refund });
});

