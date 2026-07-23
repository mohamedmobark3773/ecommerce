import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../errors/app.error.js";
import { attributeService } from "../services/attribute.service.js";

export const createAttribute = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    createdBy: req.user?._id,
  };

  const attribute = await attributeService.createAttribute(payload);

  return res.status(201).json({
    success: true,
    message: "Attribute created successfully.",
    data: attribute,
  });
});

export const getAttributes = asyncHandler(async (req, res) => {
  const attributes = await attributeService.getAttributes(req.query);

  return res.status(200).json({
    success: true,
    message: "Attributes fetched successfully.",
    data: attributes,
  });
});

export const getAttributeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const attribute = await attributeService.getAttributeById(id);

  if (!attribute) {
    throw new ApiError(404, "Attribute not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Attribute fetched successfully.",
    data: attribute,
  });
});

export const addAttributeToProduct = asyncHandler(async (req, res) => {
  const { productId, attributeId } = req.params;
  const { value } = req.body;

  const result = await attributeService.addAttributeToProduct(productId, attributeId, value);

  return res.status(200).json({
    success: true,
    message: "Attribute added to product successfully.",
    data: result,
  });
});

export const updateAttribute = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const attribute = await attributeService.updateAttribute(id, req.body);

  if (!attribute) {
    throw new ApiError(404, "Attribute not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Attribute updated successfully.",
    data: attribute,
  });
});

export const deleteAttribute = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const attribute = await attributeService.deleteAttribute(id);

  if (!attribute) {
    throw new ApiError(404, "Attribute not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Attribute deleted successfully.",
    data: attribute,
  });
});