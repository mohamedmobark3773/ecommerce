import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { Session } from '../models/session.model.js';

export const createSession = asyncHandler(async (req, res) => {
  const session = await Session.create(req.body);
  return res.status(201).json({ success: true, message: 'Session created successfully.', data: session });
});

export const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find(req.query);
  return res.status(200).json({ success: true, message: 'Sessions retrieved successfully.', data: sessions });
});

