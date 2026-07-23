export class CollectionDTO {
  constructor(collection) {
    this.id = collection._id || collection.id || null;
    this.name = collection.name || '';
    this.slug = collection.slug || '';
    this.description = collection.description || '';
    this.isActive = typeof collection.isActive === 'boolean' ? collection.isActive : true;
    this.createdAt = collection.createdAt || null;
    this.updatedAt = collection.updatedAt || null;
  }

  static transform(collection) {
    if (!collection) return null;
    if (Array.isArray(collection)) {
      return collection.map((item) => new CollectionDTO(item));
    }
    return new CollectionDTO(collection);
  }

  static toDatabase(data = {}) {
    return {
      name: data.name ? data.name.trim() : undefined,
      slug: data.slug ? data.slug.trim().toLowerCase() : undefined,
      description: data.description ? data.description.trim() : undefined,
      isActive: typeof data.isActive === 'boolean' ? data.isActive : undefined,
    };
  }
}

export default CollectionDTO;

