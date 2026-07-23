import { promises as fs } from "fs";
import path from "path";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../../errors/app.error.js";
import { uploadsService } from "./uploads.service.js";

export const createUpload = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "A file is required.");
  }

  const uploadData = {
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    url: req.file.path,
    ...req.body,
  };

  const upload = await uploadsService.createUpload(uploadData);

  return res.status(201).json({
    success: true,
    message: "File uploaded successfully.",
    data: upload,
  });
});

export const getUploads = asyncHandler(async (req, res) => {
  const result = await uploadsService.getUploads(req.query);

  return res.status(200).json({
    success: true,
    message: "Uploads retrieved successfully.",
    data: result,
  });
});

export const getUploadById = asyncHandler(async (req, res) => {
  const { uploadId } = req.params;
  const upload = await uploadsService.getUploadById(uploadId);

  if (!upload) {
    throw new ApiError(404, "Upload not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Upload retrieved successfully.",
    data: upload,
  });
});

export const updateUpload = asyncHandler(async (req, res) => {
  const { uploadId } = req.params;
  const upload = await uploadsService.updateUpload(uploadId, req.body);

  if (!upload) {
    throw new ApiError(404, "Upload not found.");
  }

  return res.status(200).json({
    success: true,
    message: "Upload updated successfully.",
    data: upload,
  });
});

export const deleteUpload = asyncHandler(async (req, res) => {
  const { uploadId } = req.params;
  const upload = await uploadsService.deleteUpload(uploadId);

  if (!upload) {
    throw new ApiError(404, "Upload not found.");
  }

  if (upload.path) {
    const targetPath = path.isAbsolute(upload.path)
      ? upload.path
      : path.join(process.cwd(), upload.path);

    await fs.unlink(targetPath).catch(() => {});
  }

  return res.status(200).json({
    success: true,
    message: "Upload deleted successfully.",
    data: upload,
  });
});

