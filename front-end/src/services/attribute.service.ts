import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "./api";
import type { ApiResponse, Attribute, AttributeListResponse } from "@/types";

export const attributeService = {
  async list(params?: Record<string, string | number | undefined>) {
    const response = await apiClient.get<any>(API_ENDPOINTS.attributes, { params });
    const payload = response.data?.data ?? response.data;
    const attributes = Array.isArray(payload?.items)
      ? payload.items.map((item: Partial<Attribute> & { _id?: string }) => ({
          id: item.id ?? item._id ?? "",
          name: item.name ?? "",
          values: item.values,
          createdBy: item.createdBy,
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      : [];

    return {
      success: response.data?.success ?? true,
      message: response.data?.message,
      data: {
        attributes,
        pagination: payload?.pagination ?? {
          page: 1,
          limit: attributes.length || 20,
          total: attributes.length,
          pages: 1,
        },
      } satisfies AttributeListResponse,
    } as ApiResponse<AttributeListResponse>;
  },

  async getById(attributeId: string) {
    const response = await apiClient.get<ApiResponse<Attribute>>(API_ENDPOINTS.attributes + `/${attributeId}`);
    return response.data;
  },
};
