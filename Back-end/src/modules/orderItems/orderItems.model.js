import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order id is required."],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id is required."],
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      default: null,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
    unitPrice: {
      type: Number,
      required: [true, "Unit price is required."],
      min: [0, "Unit price must be greater than or equal to 0"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
      min: [0, "Total price must be greater than or equal to 0"],
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: [0, "Discount amount must be greater than or equal to 0"],
    },
    taxAmount: {
      type: Number,
      default: 0,
      min: [0, "Tax amount must be greater than or equal to 0"],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

orderItemSchema.index({ order: 1, product: 1 });

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);

