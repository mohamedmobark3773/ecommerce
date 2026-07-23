import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Inventory } from '../models/inventory.model.js';

export const createInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventory.create(req.body);
  return res.status(201).json({ success: true, message: 'Inventory created successfully.', data: inventory });
});

export const getInventories = asyncHandler(async (req, res) => {
  const inventories = await Inventory.find(req.query);
  return res.status(200).json({ success: true, message: 'Inventories retrieved successfully.', data: inventories });
});

export const getInventoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const inventory = await Inventory.findById(id);
  if (!inventory) throw new ApiError(404, 'Inventory not found.');
  return res.status(200).json({ success: true, message: 'Inventory retrieved successfully.', data: inventory });
});

export const updateInventory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const inventory = await Inventory.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!inventory) throw new ApiError(404, 'Inventory not found.');
  return res.status(200).json({ success: true, message: 'Inventory updated successfully.', data: inventory });
});

export const deleteInventory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const inventory = await Inventory.findByIdAndDelete(id);
  if (!inventory) throw new ApiError(404, 'Inventory not found.');
  return res.status(200).json({ success: true, message: 'Inventory deleted successfully.' });
});

