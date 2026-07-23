import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';

export const getHealth = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

export const getReady = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    status: 'READY',
    timestamp: new Date().toISOString(),
  });
});

