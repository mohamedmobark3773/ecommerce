import { brandsRepository } from "./brands.repository.js";
import { BrandDTO } from "./brands.dto.js";

class BrandsService {
  async createBrand(brandData) {
    const formattedData = BrandDTO.toDatabase(brandData);
    const brand = await brandsRepository.create(formattedData);
    return BrandDTO.transform(brand);
  }

  async getBrands(query = {}) {
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

    if (query.country) {
      filter.country = query.country.toUpperCase();
    }

    if (query.page) options.page = Number(query.page);
    if (query.limit) options.limit = Number(query.limit);

    const result = await brandsRepository.findAll(filter, options);
    return {
      ...result,
      brands: BrandDTO.transform(result.brands),
    };
  }

  async getBrandById(brandId) {
    const brand = await brandsRepository.findById(brandId);
    return BrandDTO.transform(brand);
  }

  async updateBrand(brandId, brandData) {
    const formattedData = BrandDTO.toDatabase(brandData);
    const brand = await brandsRepository.update(brandId, formattedData);
    return BrandDTO.transform(brand);
  }

  async deleteBrand(brandId) {
    const brand = await brandsRepository.delete(brandId);
    return BrandDTO.transform(brand);
  }
}

export const brandsService = new BrandsService();

