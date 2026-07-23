import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required."],
      unique: true,
    },
    shopName: {
      type: String,
      required: [true, "Shop name is required."],
      trim: true,
      minlength: [2, "Shop name must be at least 2 characters."],
      maxlength: [150, "Shop name cannot exceed 150 characters."],
    },
    shopSlug: {
      type: String,
      required: [true, "Shop slug is required."],
      trim: true,
      unique: true,
      lowercase: true,
      maxlength: [150, "Shop slug cannot exceed 150 characters."],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Description cannot exceed 2000 characters."],
    },
    logo: {
      type: String,
      trim: true,
      default: "",
    },
    banner: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending",
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

sellerSchema.index({ status: 1, isVerified: 1 });
sellerSchema.index({ shopName: "text", shopSlug: "text" });

export const Seller = mongoose.model("Seller", sellerSchema);

