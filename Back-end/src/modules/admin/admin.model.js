import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      default: "SouqX E-Commerce",
      trim: true,
    },
    siteEmail: {
      type: String,
      required: true,
      default: "info@souqx.com",
      trim: true,
    },
    supportPhone: {
      type: String,
      trim: true,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "USD",
      trim: true,
    },
    allowedCountries: [
      {
        type: String,
        trim: true,
      },
    ],
    taxRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    shippingFee: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const AdminSettings = mongoose.model("AdminSettings", adminSettingsSchema);
