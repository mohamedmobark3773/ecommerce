import mongoose from 'mongoose';

const giftCardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Gift card code is required.'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required.'],
      min: [0, 'Balance cannot be negative.'],
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      minlength: [3, 'Currency must be 3 characters.'],
      maxlength: [3, 'Currency must be 3 characters.'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const GiftCard = mongoose.model('GiftCard', giftCardSchema);
export default GiftCard;

