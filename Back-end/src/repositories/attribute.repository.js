import { Attribute } from '../models/attribute.model.js';

class AttributeRepository {
  async create(attributeData) {
    return Attribute.create(attributeData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [attributes, total] = await Promise.all([
      Attribute.find(filter).sort(sort).skip(skip).limit(limit),
      Attribute.countDocuments(filter),
    ]);

    return {
      attributes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(attributeId) {
    return Attribute.findById(attributeId);
  }

  async update(attributeId, attributeData) {
    return Attribute.findByIdAndUpdate(attributeId, { $set: attributeData }, { new: true, runValidators: true });
  }

  async delete(attributeId) {
    return Attribute.findByIdAndDelete(attributeId);
  }
}

export const attributeRepository = new AttributeRepository();

