import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "./api";
import type { ApiResponse, Category, CategoryListResponse } from "@/types";

export const categoryService = {
  async list(params?: Record<string, string | number | undefined>) {
    const response = await apiClient.get<any>(API_ENDPOINTS.categories, { params });
    const payload = response.data?.data ?? response.data;
    const categories = Array.isArray(payload?.categories)
      ? payload.categories.map((item: Partial<Category> & { _id?: string }) => ({
          id: item.id ?? item._id ?? "",
          name: item.name ?? "",
          slug: item.slug,
          description: item.description,
          image: item.image,
          isFeatured: item.isFeatured,
          isActive: item.isActive,
          parent: item.parent,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      : [];

    return {
      success: response.data?.success ?? true,
      message: response.data?.message,
      data: {
        categories,
        pagination: payload?.pagination ?? {
          page: 1,
          limit: categories.length || 20,
          total: categories.length,
          pages: 1,
        },
      } satisfies CategoryListResponse,
    } as ApiResponse<CategoryListResponse>;
  },

  async getById(categoryId: string) {
    const response = await apiClient.get<ApiResponse<Category>>(API_ENDPOINTS.categories + `/${categoryId}`);
    return response.data;
  },
};
