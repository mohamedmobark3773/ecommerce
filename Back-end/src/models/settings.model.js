import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      trim: true,
      default: 'Ecommerce',
    },
    currency: {
      type: String,
      trim: true,
      default: 'USD',
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;

