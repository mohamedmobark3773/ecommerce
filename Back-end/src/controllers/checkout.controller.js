import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';

export const createCheckout = asyncHandler(async (req, res) => {
  const checkout = {
    user: req.user?._id,
    items: req.body.items || [],
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    status: 'pending',
  };

  return res.status(201).json({ success: true, message: 'Checkout initialized successfully.', data: checkout });
});

export const getCheckoutById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, 'Checkout id is required.');
  }

  return res.status(200).json({ success: true, message: 'Checkout retrieved successfully.', data: { id } });
});

