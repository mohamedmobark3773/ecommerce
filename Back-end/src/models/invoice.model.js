import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order id is required.'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required.'],
      min: [0, 'Amount cannot be negative.'],
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;

