import { Router } from "express";
import upload from "../../middlewares/upload.middleware.js";
import { validate } from "../../validators/base.validator.js";
import {
  createUpload,
  getUploads,
  getUploadById,
  updateUpload,
  deleteUpload,
} from "./uploads.controller.js";
import { createUploadValidator, updateUploadValidator, uploadIdValidator } from "./uploads.validator.js";

const router = Router();

router.route("/")
  .post(upload.single("file"), createUploadValidator, validate, createUpload)
  .get(getUploads);

router.route("/:uploadId")
  .get(uploadIdValidator, getUploadById)
  .put(uploadIdValidator, updateUploadValidator, updateUpload)
  .delete(uploadIdValidator, deleteUpload);

export default router;

