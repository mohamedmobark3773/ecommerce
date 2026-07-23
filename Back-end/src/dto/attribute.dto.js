export class AttributeDTO {
  constructor(attribute) {
    this.id = attribute._id;
    this.name = attribute.name;
    this.values = attribute.values || [];
    this.createdBy = attribute.createdBy;
    this.status = attribute.status;
    this.createdAt = attribute.createdAt;
    this.updatedAt = attribute.updatedAt;
  }

  static transform(attribute) {
    if (!attribute) return null;
    if (Array.isArray(attribute)) {
      return attribute.map((item) => new AttributeDTO(item));
    }
    return new AttributeDTO(attribute);
  }

  static toDatabase(data) {
    return {
      name: data.name ? data.name.trim() : undefined,
      values: data.values ? data.values.map((value) => value.trim()).filter(Boolean) : undefined,
      createdBy: data.createdBy ? data.createdBy : undefined,
      status: data.status ? data.status : undefined,
    };
  }
}

