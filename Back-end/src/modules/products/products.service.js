import { productsRepository } from "./products.repository.js";
import { ProductDTO } from "./products.dto.js";

class ProductsService {
  async createProduct(productData) {
    const formattedData = ProductDTO.toDatabase(productData);
    const product = await productsRepository.create(formattedData);
    return ProductDTO.transform(product);
  }

  async getProducts(query = {}) {
    const filter = {};
    const options = {};

    if (query.search) {
      const search = query.search.trim();
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    if (query.category) filter.category = query.category;
    if (query.subcategory) filter.subcategory = query.subcategory;
    if (query.brand) filter.brand = query.brand;
    if (query.status) filter.status = query.status;

    if (query.isFeatured !== undefined) {
      filter.isFeatured = query.isFeatured === "true" || query.isFeatured === true;
    }

    if (query.minPrice !== undefined) {
      filter.price = { ...(filter.price || {}), $gte: Number(query.minPrice) };
    }

    if (query.maxPrice !== undefined) {
      filter.price = { ...(filter.price || {}), $lte: Number(query.maxPrice) };
    }

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    if (query.sort === "price_asc") {
      options.sort = { price: 1 };
    } else if (query.sort === "price_desc") {
      options.sort = { price: -1 };
    } else if (query.sort === "newest") {
      options.sort = { createdAt: -1 };
    } else {
      options.sort = { createdAt: -1 };
    }

    const result = await productsRepository.findAll(filter, options);
    return {
      ...result,
      products: ProductDTO.transform(result.products),
    };
  }

  async getProductById(productId) {
    const product = await productsRepository.findById(productId);
    return ProductDTO.transform(product);
  }

  async updateProduct(productId, productData) {
    const formattedData = ProductDTO.toDatabase(productData);
    const product = await productsRepository.update(productId, formattedData);
    return ProductDTO.transform(product);
  }

  async deleteProduct(productId) {
    const product = await productsRepository.delete(productId);
    return ProductDTO.transform(product);
  }
}

export const productsService = new ProductsService();

