export class UploadDTO {
  constructor(upload) {
    this.id = upload._id;
    this.filename = upload.filename;
    this.originalName = upload.originalName;
    this.mimeType = upload.mimeType;
    this.size = upload.size;
    this.path = upload.path;
    this.url = upload.url;
    this.entityType = upload.entityType;
    this.entityId = upload.entityId;
    this.altText = upload.altText;
    this.isPrimary = upload.isPrimary;
    this.status = upload.status;
    this.uploadedBy = upload.uploadedBy;
    this.createdAt = upload.createdAt;
    this.updatedAt = upload.updatedAt;
  }

  static transform(upload) {
    if (!upload) return null;
    if (Array.isArray(upload)) {
      return upload.map((item) => new UploadDTO(item));
    }
    return new UploadDTO(upload);
  }

  static toDatabase(data) {
    return {
      filename: data.filename ? data.filename.trim() : undefined,
      originalName: data.originalName ? data.originalName.trim() : undefined,
      mimeType: data.mimeType ? data.mimeType.trim() : undefined,
      size: data.size !== undefined ? Number(data.size) : undefined,
      path: data.path ? data.path.trim() : undefined,
      url: data.url ? data.url.trim() : undefined,
      entityType: data.entityType ? data.entityType.trim() : undefined,
      entityId: data.entityId ? data.entityId.trim() : undefined,
      altText: data.altText ? data.altText.trim() : undefined,
      isPrimary: data.isPrimary !== undefined ? !!data.isPrimary : undefined,
      status: data.status ? data.status.trim() : undefined,
      uploadedBy: data.uploadedBy ? data.uploadedBy : undefined,
    };
  }
}

