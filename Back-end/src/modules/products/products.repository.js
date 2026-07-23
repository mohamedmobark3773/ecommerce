import { Product } from "./products.model.js";

class ProductsRepository {
  async create(productData) {
    return await Product.create(productData);
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(limit).populate("category subcategory brand"),
      Product.countDocuments(filter),
    ]);

    return {
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findById(productId) {
    return await Product.findById(productId).populate("category subcategory brand");
  }

  async update(productId, productData) {
    return await Product.findByIdAndUpdate(productId, { $set: productData }, { new: true, runValidators: true }).populate("category subcategory brand");
  }

  async delete(productId) {
    return await Product.findByIdAndDelete(productId);
  }
}

export const productsRepository = new ProductsRepository();

