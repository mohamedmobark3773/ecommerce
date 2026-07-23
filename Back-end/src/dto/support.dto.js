export class SupportDTO {
  constructor(support) {
    this.id = support._id || support.id || null;
    this.user = support.user || null;
    this.subject = support.subject || '';
    this.message = support.message || '';
    this.status = support.status || 'open';
    this.createdAt = support.createdAt || null;
    this.updatedAt = support.updatedAt || null;
  }

  static transform(support) {
    if (!support) return null;
    if (Array.isArray(support)) {
      return support.map((item) => new SupportDTO(item));
    }
    return new SupportDTO(support);
  }

  static toDatabase(data = {}) {
    return {
      user: data.user || undefined,
      subject: data.subject ? data.subject.trim() : undefined,
      message: data.message ? data.message.trim() : undefined,
      status: data.status ? data.status : undefined,
    };
  }
}

export default SupportDTO;

