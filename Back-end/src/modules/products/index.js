export { default as productsRouter } from "./products.routes.js";
export { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./products.controller.js";
export { productsService } from "./products.service.js";
export { productsRepository } from "./products.repository.js";
export { Product } from "./products.model.js";
export { ProductDTO } from "./products.dto.js";
export { createProductSchema, updateProductSchema } from "./products.schema.js";
export { createProductValidator, updateProductValidator, productIdValidator } from "./products.validator.js";

