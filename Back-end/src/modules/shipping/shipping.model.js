import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Shipping method name is required."],
      trim: true,
      minlength: [2, "Shipping method name must be at least 2 characters."],
      maxlength: [100, "Shipping method name cannot exceed 100 characters."],
    },
    code: {
      type: String,
      required: [true, "Shipping code is required."],
      trim: true,
      unique: true,
      uppercase: true,
      maxlength: [20, "Shipping code cannot exceed 20 characters."],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price must be at least 0"],
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
      minlength: [3, "Currency must be 3 characters."],
      maxlength: [3, "Currency must be 3 characters."],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    estimatedDays: {
      type: Number,
      default: 3,
      min: [1, "Estimated days must be at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

shippingSchema.index({ isActive: 1, createdAt: -1 });

export const Shipping = mongoose.model("Shipping", shippingSchema);

