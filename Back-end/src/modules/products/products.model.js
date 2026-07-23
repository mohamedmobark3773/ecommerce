import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters."],
    },
    slug: {
      type: String,
      required: [true, "Product slug is required."],
      trim: true,
      unique: true,
      lowercase: true,
      maxlength: [200, "Product slug cannot exceed 200 characters."],
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
      trim: true,
      maxlength: [5000, "Product description cannot exceed 5000 characters."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price must be greater than or equal to 0"],
    },
    compareAtPrice: {
      type: Number,
      default: 0,
      min: [0, "Compare at price must be greater than or equal to 0"],
    },
    costPerItem: {
      type: Number,
      default: 0,
      min: [0, "Cost per item must be greater than or equal to 0"],
    },
    sku: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      default: null,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock must be greater than or equal to 0"],
    },
    images: {
      type: [String],
      default: [],
    },
    attributes: {
      type: [
        {
          attributeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attribute",
            required: true,
          },
          value: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "draft", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ category: 1, status: 1 });
productSchema.index({ brand: 1, status: 1 });
productSchema.index({ name: "text", slug: "text", sku: "text" });

export const Product = mongoose.model("Product", productSchema);

