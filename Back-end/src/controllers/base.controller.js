import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { ApiError } from '../errors/app.error.js';

export class BaseController {
  constructor(service) {
    this.service = service;
  }

  create = asyncHandler(async (req, res) => {
    const data = await this.service.create(req.body);
    return res.status(201).json({ success: true, message: `${this.resourceName} created successfully.`, data });
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await this.service.getAll(req.query);
    return res.status(200).json({ success: true, message: `${this.resourceName} retrieved successfully.`, data });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await this.service.getById(id);
    if (!data) {
      throw new ApiError(404, `${this.resourceName} not found.`);
    }
    return res.status(200).json({ success: true, message: `${this.resourceName} retrieved successfully.`, data });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await this.service.update(id, req.body);
    if (!data) {
      throw new ApiError(404, `${this.resourceName} not found.`);
    }
    return res.status(200).json({ success: true, message: `${this.resourceName} updated successfully.`, data });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await this.service.delete(id);
    if (!data) {
      throw new ApiError(404, `${this.resourceName} not found.`);
    }
    return res.status(200).json({ success: true, message: `${this.resourceName} deleted successfully.`, data });
  });
}

