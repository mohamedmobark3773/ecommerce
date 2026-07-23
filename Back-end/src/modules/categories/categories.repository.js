import { Category } from "./categories.model.js";

class CategoriesRepository {
  async create(categoryData) {
    return await Category.create(categoryData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      Category.find(filter).sort(sort).skip(skip).limit(limit),
      Category.countDocuments(filter),
    ]);

    return {
      categories,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(categoryId) {
    return await Category.findById(categoryId);
  }

  async findOne(filter) {
    return await Category.findOne(filter);
  }

  async update(categoryId, categoryData) {
    return await Category.findByIdAndUpdate(categoryId, { $set: categoryData }, { new: true, runValidators: true });
  }

  async delete(categoryId) {
    return await Category.findByIdAndDelete(categoryId);
  }
}

export const categoriesRepository = new CategoriesRepository();

