import { Brand } from "./brands.model.js";

class BrandsRepository {
  async create(brandData) {
    return await Brand.create(brandData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [brands, total] = await Promise.all([
      Brand.find(filter).sort(sort).skip(skip).limit(limit),
      Brand.countDocuments(filter),
    ]);

    return {
      brands,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(brandId) {
    return await Brand.findById(brandId);
  }

  async findOne(filter) {
    return await Brand.findOne(filter);
  }

  async update(brandId, brandData) {
    return await Brand.findByIdAndUpdate(brandId, { $set: brandData }, { new: true, runValidators: true });
  }

  async delete(brandId) {
    return await Brand.findByIdAndDelete(brandId);
  }
}

export const brandsRepository = new BrandsRepository();

