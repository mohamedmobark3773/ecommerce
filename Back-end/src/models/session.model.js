import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required.'],
    },
    token: {
      type: String,
      required: [true, 'Token is required.'],
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiration date is required.'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Automatically remove expired sessions using TTL index on `expiresAt`.
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model('Session', sessionSchema);
export default Session;

