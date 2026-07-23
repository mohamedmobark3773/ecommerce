import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      trim: true,
      unique: true,
      minlength: [2, "Category name must be at least 2 characters long."],
      maxlength: [100, "Category name cannot exceed 100 characters."],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required."],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [2, "Category slug must be at least 2 characters long."],
      maxlength: [100, "Category slug cannot exceed 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ name: 1, slug: 1 }, { unique: true });
categorySchema.index({ isActive: 1, isFeatured: 1 });
categorySchema.index({ createdAt: -1 });

export const Category = mongoose.model("Category", categorySchema);

