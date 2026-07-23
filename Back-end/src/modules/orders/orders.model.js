import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required."],
    },
    orderNumber: {
      type: String,
      required: [true, "Order number is required."],
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
    billingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
    shippingMethod: {
      type: String,
      trim: true,
      default: "standard",
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
    subtotal: {
      type: Number,
      default: 0,
      min: [0, "Subtotal must be greater than or equal to 0"],
    },
    taxAmount: {
      type: Number,
      default: 0,
      min: [0, "Tax amount must be greater than or equal to 0"],
    },
    shippingAmount: {
      type: Number,
      default: 0,
      min: [0, "Shipping amount must be greater than or equal to 0"],
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: [0, "Discount amount must be greater than or equal to 0"],
    },
    totalAmount: {
      type: Number,
      default: 0,
      min: [0, "Total amount must be greater than or equal to 0"],
    },
    currency: {
      type: String,
      default: "USD",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, paymentStatus: 1 });

export const Order = mongoose.model("Order", orderSchema);

