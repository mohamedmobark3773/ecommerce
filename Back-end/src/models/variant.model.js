import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required.'],
    },
    name: {
      type: String,
      required: [true, 'Variant name is required.'],
      trim: true,
    },
    sku: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
      min: [0, 'Price cannot be negative.'],
    },
  },
  { timestamps: true }
);

export const Variant = mongoose.model('Variant', variantSchema);
export default Variant;

