import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required.'],
    },
    sku: {
      type: String,
      trim: true,
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative.'],
    },
    reserved: {
      type: Number,
      default: 0,
      min: [0, 'Reserved cannot be negative.'],
    },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;

