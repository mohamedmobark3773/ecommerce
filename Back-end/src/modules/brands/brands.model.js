import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required."],
      trim: true,
      unique: true,
      minlength: [2, "Brand name must be at least 2 characters long."],
      maxlength: [100, "Brand name cannot exceed 100 characters."],
    },
    slug: {
      type: String,
      required: [true, "Brand slug is required."],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [2, "Brand slug must be at least 2 characters long."],
      maxlength: [100, "Brand slug cannot exceed 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    logo: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      trim: true,
      uppercase: true,
      default: "US",
    },
    website: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

brandSchema.index({ name: 1, slug: 1 }, { unique: true });
brandSchema.index({ isActive: 1, isFeatured: 1 });
brandSchema.index({ createdAt: -1 });

export const Brand = mongoose.model("Brand", brandSchema);

