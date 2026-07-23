// Back-end/src/modules/auth/auth.model.js

import mongoose from "mongoose";
import { User } from "../users/users.model.js";


const refreshTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required."],
      index: true,
    },
    token: {
      type: String,
      required: [true, "Token value is required."],
      unique: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, 
    },
  },
  {
    timestamps: true,
  }
);

refreshTokenSchema.statics.revokeAllForUser = async function (userId) {
  return this.updateMany({ user: userId, isRevoked: false }, { $set: { isRevoked: true } });
};

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export { User as default, User };
