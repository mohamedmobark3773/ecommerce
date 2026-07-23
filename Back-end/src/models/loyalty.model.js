import mongoose from 'mongoose';

const loyaltySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
    },
    points: {
      type: Number,
      default: 0,
      min: [0, 'Points cannot be negative.'],
    },
    tier: {
      type: String,
      enum: ['bronze', 'silver', 'gold'],
      default: 'bronze',
    },
  },
  { timestamps: true }
);

export const Loyalty = mongoose.model('Loyalty', loyaltySchema);
export default Loyalty;

