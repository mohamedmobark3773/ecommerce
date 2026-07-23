import { uploadsRepository } from "./uploads.repository.js";
import { UploadDTO } from "./uploads.dto.js";

class UploadsService {
  async createUpload(uploadData) {
    const formattedData = UploadDTO.toDatabase(uploadData);
    const upload = await uploadsRepository.create(formattedData);
    return UploadDTO.transform(upload);
  }

  async getUploads(query = {}) {
    const filter = {};
    const options = {};

    if (query.entityType) filter.entityType = query.entityType;
    if (query.entityId) filter.entityId = query.entityId;
    if (query.status) filter.status = query.status;

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await uploadsRepository.findAll(filter, options);
    return {
      ...result,
      uploads: UploadDTO.transform(result.uploads),
    };
  }

  async getUploadById(uploadId) {
    const upload = await uploadsRepository.findById(uploadId);
    return UploadDTO.transform(upload);
  }

  async updateUpload(uploadId, uploadData) {
    const formattedData = UploadDTO.toDatabase(uploadData);
    const upload = await uploadsRepository.update(uploadId, formattedData);
    return UploadDTO.transform(upload);
  }

  async deleteUpload(uploadId) {
    const upload = await uploadsRepository.delete(uploadId);
    return UploadDTO.transform(upload);
  }
}

export const uploadsService = new UploadsService();

