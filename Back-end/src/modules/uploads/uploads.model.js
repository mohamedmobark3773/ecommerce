import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, "Filename is required."],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, "Original filename is required."],
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, "Mime type is required."],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "File size is required."],
      min: [0, "File size cannot be negative."],
    },
    path: {
      type: String,
      required: [true, "File storage path is required."],
      trim: true,
    },
    url: {
      type: String,
      trim: true,
      default: "",
    },
    entityType: {
      type: String,
      trim: true,
      default: "general",
      maxlength: [50, "Entity type cannot exceed 50 characters."],
    },
    entityId: {
      type: String,
      trim: true,
      maxlength: [100, "Entity id cannot exceed 100 characters."],
    },
    altText: {
      type: String,
      trim: true,
      default: "",
      maxlength: [200, "Alt text cannot exceed 200 characters."],
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "failed"],
      default: "uploaded",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

uploadSchema.index({ entityType: 1, entityId: 1, createdAt: -1 });

export const Upload = mongoose.model("Upload", uploadSchema);

