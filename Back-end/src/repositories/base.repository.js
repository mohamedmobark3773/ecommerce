//src/repositories/base.repository.js
export class BaseRepository {
  constructor(resourceName = 'resource') {
    this.resourceName = resourceName;
    this.store = new Map();
    this.counter = 0;
    this.model = null;
  }

  _nextId() {
    this.counter += 1;
    return `${this.resourceName}-${this.counter}`;
  }

  _matchesFilter(item, filter = {}) {
    return Object.entries(filter).every(([key, value]) => {
      if (value === undefined || value === null) {
        return true;
      }

      if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        return Object.entries(value).every(([nestedKey, nestedValue]) => item?.[key]?.[nestedKey] === nestedValue);
      }

      return item?.[key] === value;
    });
  }

  async create(data = {}) {
    if (this.model?.create) {
      return this.model.create(data);
    }

    const document = {
      _id: this._nextId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.store.set(document._id, document);
    return document;
  }

  async findAll(filter = {}, options = {}) {
    if (this.model?.find) {
      const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
      const skip = (page - 1) * limit;

      const [items, total] = await Promise.all([
        this.model.find(filter).sort(sort).skip(skip).limit(limit),
        this.model.countDocuments(filter),
      ]);

      return {
        items,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit) || 0,
        },
      };
    }

    const items = Array.from(this.store.values()).filter((item) => this._matchesFilter(item, filter));
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 20);
    const skip = (page - 1) * limit;

    return {
      items: items.slice(skip, skip + limit),
      pagination: {
        page,
        limit,
        total: items.length,
        pages: Math.ceil(items.length / limit) || 0,
      },
    };
  }

  async findById(id) {
    if (this.model?.findById) {
      return this.model.findById(id);
    }

    return this.store.get(id) || null;
  }

  async findOne(filter = {}) {
    if (this.model?.findOne) {
      return this.model.findOne(filter);
    }

    return Array.from(this.store.values()).find((item) => this._matchesFilter(item, filter)) || null;
  }

  async update(id, data = {}) {
    if (this.model?.findByIdAndUpdate) {
      return this.model.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    }

    const existing = this.store.get(id);
    if (!existing) {
      return null;
    }

    const updated = {
      ...existing,
      ...data,
      _id: id,
      updatedAt: new Date().toISOString(),
    };

    this.store.set(id, updated);
    return updated;
  }

  async delete(id) {
    if (this.model?.findByIdAndDelete) {
      return this.model.findByIdAndDelete(id);
    }

    const existing = this.store.get(id);
    if (!existing) {
      return null;
    }

    this.store.delete(id);
    return existing;
  }

  async count(filter = {}) {
    if (this.model?.countDocuments) {
      return this.model.countDocuments(filter);
    }

    return Array.from(this.store.values()).filter((item) => this._matchesFilter(item, filter)).length;
  }
}

export default BaseRepository;

