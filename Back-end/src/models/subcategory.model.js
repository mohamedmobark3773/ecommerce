import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subcategory name is required.'],
      trim: true,
      maxlength: [100, 'Subcategory name cannot exceed 100 characters.'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required.'],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Subcategory = mongoose.model('Subcategory', subcategorySchema);
export default Subcategory;

