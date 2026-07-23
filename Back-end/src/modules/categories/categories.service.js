import { categoriesRepository } from "./categories.repository.js";
import { CategoryDTO } from "./categories.dto.js";

class CategoriesService {
  async createCategory(categoryData) {
    const formattedData = CategoryDTO.toDatabase(categoryData);
    const category = await categoriesRepository.create(formattedData);
    return CategoryDTO.transform(category);
  }

  async getCategories(query = {}) {
    const filter = {};
    const options = {};

    if (query.search) {
      const search = query.search.trim();
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive === "true" || query.isActive === true;
    }

    if (query.isFeatured !== undefined) {
      filter.isFeatured = query.isFeatured === "true" || query.isFeatured === true;
    }

    if (query.parent !== undefined) {
      filter.parent = query.parent === "null" ? null : query.parent;
    }

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await categoriesRepository.findAll(filter, options);
    return {
      ...result,
      categories: CategoryDTO.transform(result.categories),
    };
  }

  async getCategoryById(categoryId) {
    const category = await categoriesRepository.findById(categoryId);
    return CategoryDTO.transform(category);
  }

  async updateCategory(categoryId, categoryData) {
    const formattedData = CategoryDTO.toDatabase(categoryData);
    const category = await categoriesRepository.update(categoryId, formattedData);
    return CategoryDTO.transform(category);
  }

  async deleteCategory(categoryId) {
    const category = await categoriesRepository.delete(categoryId);
    return CategoryDTO.transform(category);
  }
}

export const categoriesService = new CategoriesService();

