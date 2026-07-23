import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, 'Balance cannot be negative.'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
  },
  { timestamps: true }
);

export const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;

