export { default as brandsRouter } from "./brands.routes.js";
export { createBrand, getBrands, getBrandById, updateBrand, deleteBrand } from "./brands.controller.js";
export { brandsService } from "./brands.service.js";
export { brandsRepository } from "./brands.repository.js";
export { Brand } from "./brands.model.js";
export { BrandDTO } from "./brands.dto.js";
export { createBrandSchema, updateBrandSchema } from "./brands.schema.js";
export { createBrandValidator, updateBrandValidator, brandIdValidator } from "./brands.validator.js";

