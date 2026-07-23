import mongoose from 'mongoose';

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Attribute name is required.'],
      trim: true,
      minlength: [2, 'Attribute name must be at least 2 characters.'],
      maxlength: [50, 'Attribute name cannot exceed 50 characters.'],
    },
    values: {
      type: [String],
      default: [],
      validate: {
        validator: (values) => values.every((value) => typeof value === 'string' && value.trim().length > 0),
        message: 'Each value must be a non-empty string.',
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

attributeSchema.index({ name: 'text' });

export const Attribute = mongoose.model('Attribute', attributeSchema);
export default Attribute;

