import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required."],
      unique: true,
      trim: true,
      uppercase: true,
      minlength: [3, "Coupon code must be at least 3 characters long."],
      maxlength: [50, "Coupon code cannot exceed 50 characters."],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Coupon type is required."],
    },
    value: {
      type: Number,
      required: [true, "Coupon value is required."],
      min: [0, "Coupon value must be greater than or equal to 0"],
    },
    minimumOrderAmount: {
      type: Number,
      default: 0,
      min: [0, "Minimum order amount must be greater than or equal to 0"],
    },
    maximumDiscountAmount: {
      type: Number,
      default: null,
      min: [0, "Maximum discount amount must be greater than or equal to 0"],
    },
    usageLimit: {
      type: Number,
      default: null,
      min: [1, "Usage limit must be at least 1"],
    },
    usedCount: {
      type: Number,
      default: 0,
      min: [0, "Used count must be greater than or equal to 0"],
    },
    startsAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    applicableTo: {
      type: String,
      enum: ["all", "products", "categories"],
      default: "all",
    },
    applicableItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "applicableToModel",
      },
    ],
    applicableToModel: {
      type: String,
      enum: ["Product", "Category"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ isActive: 1, expiresAt: 1 });

export const Coupon = mongoose.model("Coupon", couponSchema);

