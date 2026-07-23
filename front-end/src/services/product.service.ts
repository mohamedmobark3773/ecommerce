import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "./api";
import type { ApiResponse, Product, ProductListResponse } from "@/types";

export const productService = {
  async list(params?: Record<string, string | number | undefined>) {
    const response = await apiClient.get<any>(API_ENDPOINTS.products, { params });
    const payload = response.data?.data ?? response.data;
    const products = Array.isArray(payload?.products)
      ? payload.products.map((item: Partial<Product> & { _id?: string }) => ({
          id: item.id ?? item._id ?? "",
          name: item.name ?? "",
          slug: item.slug,
          description: item.description,
          price: item.price,
          compareAtPrice: item.compareAtPrice,
          costPerItem: item.costPerItem,
          sku: item.sku,
          category: item.category,
          subcategory: item.subcategory,
          brand: item.brand,
          stock: item.stock,
          images: item.images,
          attributes: item.attributes,
          isFeatured: item.isFeatured,
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      : [];

    return {
      success: response.data?.success ?? true,
      message: response.data?.message,
      data: {
        products,
        pagination: payload?.pagination ?? {
          page: 1,
          limit: products.length || 20,
          total: products.length,
          pages: 1,
        },
      } satisfies ProductListResponse,
    } as ApiResponse<ProductListResponse>;
  },

  async getById(productId: string) {
    const response = await apiClient.get<any>(API_ENDPOINTS.products + `/${productId}`);
    const payload = response.data?.data ?? response.data;
    const product = payload && typeof payload === "object"
      ? {
          id: payload.id ?? payload._id ?? productId,
          name: payload.name ?? "",
          slug: payload.slug,
          description: payload.description,
          price: payload.price,
          compareAtPrice: payload.compareAtPrice,
          costPerItem: payload.costPerItem,
          sku: payload.sku,
          category: payload.category,
          subcategory: payload.subcategory,
          brand: payload.brand,
          stock: payload.stock,
          images: payload.images ?? [],
          attributes: payload.attributes ?? [],
          isFeatured: payload.isFeatured,
          status: payload.status,
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
        }
      : null;

    return {
      success: response.data?.success ?? true,
      message: response.data?.message,
      data: product,
    } as ApiResponse<Product | null>;
  },
};
