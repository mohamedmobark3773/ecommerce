import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order id is required."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required."],
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "card", "paypal", "wallet", "stripe"],
      default: "cod",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required."],
      min: [0.01, "Amount must be greater than 0"],
    },
    currency: {
      type: String,
      trim: true,
      uppercase: true,
      default: "USD",
      minlength: [3, "Currency code must be 3 characters."],
      maxlength: [3, "Currency code must be 3 characters."],
    },
    transactionId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      maxlength: [100, "Transaction id cannot exceed 100 characters."],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ order: 1, status: 1 });
paymentSchema.index({ user: 1, createdAt: -1 });

export const Payment = mongoose.model("Payment", paymentSchema);

