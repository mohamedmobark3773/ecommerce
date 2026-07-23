import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "./api";
import type { ApiResponse, Brand, BrandListResponse } from "@/types";

export const brandService = {
  async list(params?: Record<string, string | number | undefined>) {
    const response = await apiClient.get<any>(API_ENDPOINTS.brands, { params });
    const payload = response.data?.data ?? response.data;
    const brands = Array.isArray(payload?.brands)
      ? payload.brands.map((item: Partial<Brand> & { _id?: string }) => ({
          id: item.id ?? item._id ?? "",
          name: item.name ?? "",
          slug: item.slug,
          description: item.description,
          logo: item.logo,
          isFeatured: item.isFeatured,
          isActive: item.isActive,
          country: item.country,
          website: item.website,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      : [];

    return {
      success: response.data?.success ?? true,
      message: response.data?.message,
      data: {
        brands,
        pagination: payload?.pagination ?? {
          page: 1,
          limit: brands.length || 20,
          total: brands.length,
          pages: 1,
        },
      } satisfies BrandListResponse,
    } as ApiResponse<BrandListResponse>;
  },

  async getById(brandId: string) {
    const response = await apiClient.get<ApiResponse<Brand>>(API_ENDPOINTS.brands + `/${brandId}`);
    return response.data;
  },
};
