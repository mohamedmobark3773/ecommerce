import { Upload } from "./uploads.model.js";

class UploadsRepository {
  async create(uploadData) {
    return await Upload.create(uploadData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [uploads, total] = await Promise.all([
      Upload.find(filter).sort(sort).skip(skip).limit(limit).populate("uploadedBy", "name email"),
      Upload.countDocuments(filter),
    ]);

    return {
      uploads,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(uploadId) {
    return await Upload.findById(uploadId).populate("uploadedBy", "name email");
  }

  async update(uploadId, uploadData) {
    return await Upload.findByIdAndUpdate(uploadId, { $set: uploadData }, { new: true, runValidators: true });
  }

  async delete(uploadId) {
    return await Upload.findByIdAndDelete(uploadId);
  }
}

export const uploadsRepository = new UploadsRepository();

