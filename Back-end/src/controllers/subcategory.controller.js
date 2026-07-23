import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';
import { Subcategory } from '../models/subcategory.model.js';

export const createSubcategory = asyncHandler(async (req, res) => {
  const subcategory = await Subcategory.create(req.body);
  return res.status(201).json({ success: true, message: 'Subcategory created successfully.', data: subcategory });
});

export const getSubcategories = asyncHandler(async (req, res) => {
  const subcategories = await Subcategory.find(req.query);
  return res.status(200).json({ success: true, message: 'Subcategories retrieved successfully.', data: subcategories });
});

export const getSubcategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subcategory = await Subcategory.findById(id);
  if (!subcategory) throw new ApiError(404, 'Subcategory not found.');
  return res.status(200).json({ success: true, message: 'Subcategory retrieved successfully.', data: subcategory });
});

