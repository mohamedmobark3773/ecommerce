import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Collection } from '../models/collection.model.js';

export const createCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.create(req.body);
  return res.status(201).json({ success: true, message: 'Collection created successfully.', data: collection });
});

export const getCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find(req.query);
  return res.status(200).json({ success: true, message: 'Collections retrieved successfully.', data: collections });
});

export const getCollectionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const collection = await Collection.findById(id);
  if (!collection) throw new ApiError(404, 'Collection not found.');
  return res.status(200).json({ success: true, message: 'Collection retrieved successfully.', data: collection });
});

export const updateCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const collection = await Collection.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!collection) throw new ApiError(404, 'Collection not found.');
  return res.status(200).json({ success: true, message: 'Collection updated successfully.', data: collection });
});

export const deleteCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const collection = await Collection.findByIdAndDelete(id);
  if (!collection) throw new ApiError(404, 'Collection not found.');
  return res.status(200).json({ success: true, message: 'Collection deleted successfully.' });
});

