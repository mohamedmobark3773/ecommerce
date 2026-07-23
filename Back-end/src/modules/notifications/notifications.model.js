import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    title: {
      type: String,
      required: [true, "Notification title is required."],
      trim: true,
      maxlength: [150, "Notification title cannot exceed 150 characters."],
    },
    message: {
      type: String,
      required: [true, "Notification message is required."],
      trim: true,
      maxlength: [2000, "Notification message cannot exceed 2000 characters."],
    },
    type: {
      type: String,
      enum: ["info", "success", "warning", "error"],
      default: "info",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

export const Notification = mongoose.model("Notification", notificationSchema);

