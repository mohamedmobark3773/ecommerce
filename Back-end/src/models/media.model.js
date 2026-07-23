import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
	{
		filename: { type: String, required: true, trim: true },
		originalName: { type: String, trim: true, default: '' },
		mimeType: { type: String, trim: true, default: '' },
		size: { type: Number, default: 0, min: 0 },
		url: { type: String, trim: true, default: '' },
		provider: { type: String, trim: true, default: 'local' },
		meta: { type: Object, default: {} },
		uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
		status: { type: String, enum: ['active', 'archived'], default: 'active' },
	},
	{ timestamps: true }
);

mediaSchema.index({ uploadedBy: 1, createdAt: -1 });

export const Media = mongoose.model('Media', mediaSchema);
export default Media;

