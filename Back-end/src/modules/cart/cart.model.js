import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required."],
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
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
      default: "USD",
    },
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required."],
      min: [0, "Subtotal cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required."],
      unique: true,
    },
    items: [cartItemSchema],
    itemsCount: {
      type: Number,
      default: 0,
      min: [0, "Items count cannot be negative"],
    },
    totalItems: {
      type: Number,
      default: 0,
      min: [0, "Total items cannot be negative"],
    },
    subtotal: {
      type: Number,
      default: 0,
      min: [0, "Subtotal cannot be negative"],
    },
    total: {
      type: Number,
      default: 0,
      min: [0, "Total cannot be negative"],
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
      default: "USD",
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("save", function (next) {
  this.itemsCount = this.items?.length || 0;
  this.totalItems = this.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  this.subtotal = this.items?.reduce((sum, item) => sum + (item.subtotal || 0), 0) || 0;
  this.total = this.subtotal;
  next();
});

export const Cart = mongoose.model("Cart", cartSchema);

