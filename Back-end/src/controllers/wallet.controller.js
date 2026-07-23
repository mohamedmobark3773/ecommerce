import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Wallet } from '../models/wallet.model.js';

export const createWallet = asyncHandler(async (req, res) => {
  const wallet = await Wallet.create(req.body);
  return res.status(201).json({ success: true, message: 'Wallet created successfully.', data: wallet });
});

export const getWallets = asyncHandler(async (req, res) => {
  const wallets = await Wallet.find(req.query);
  return res.status(200).json({ success: true, message: 'Wallets retrieved successfully.', data: wallets });
});

export const getWalletById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const wallet = await Wallet.findById(id);
  if (!wallet) throw new ApiError(404, 'Wallet not found.');
  return res.status(200).json({ success: true, message: 'Wallet retrieved successfully.', data: wallet });
});

