import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Subscription } from '../models/subscription.model.js';

export const createSubscription = asyncHandler(async (req, res) => {
  const subscription = await Subscription.create(req.body);
  return res.status(201).json({ success: true, message: 'Subscription created successfully.', data: subscription });
});

export const getSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find(req.query);
  return res.status(200).json({ success: true, message: 'Subscriptions retrieved successfully.', data: subscriptions });
});

export const getSubscriptionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subscription = await Subscription.findById(id);
  if (!subscription) throw new ApiError(404, 'Subscription not found.');
  return res.status(200).json({ success: true, message: 'Subscription retrieved successfully.', data: subscription });
});

