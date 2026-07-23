export class BaseDTO {
  constructor(data = {}) {
    this.id = data._id || data.id || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }

  static transform(data) {
    if (!data) return null;
    if (Array.isArray(data)) {
      return data.map((item) => new this(item));
    }
    return new this(data);
  }

  static toDatabase(data = {}) {
    return { ...data };
  }
}

export default BaseDTO;

