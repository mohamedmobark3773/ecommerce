import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "./api";
import type { ApiResponse, Review, ReviewListResponse } from "@/types";

export const reviewService = {
  async list(params?: Record<string, string | number | undefined>) {
    const response = await apiClient.get<any>(API_ENDPOINTS.reviews, { params });
    const payload = response.data?.data ?? response.data;
    const reviews = Array.isArray(payload?.reviews)
      ? payload.reviews.map((item: Partial<Review> & { _id?: string }) => ({
          id: item.id ?? item._id ?? "",
          user: item.user,
          product: item.product,
          rating: item.rating,
          title: item.title,
          comment: item.comment,
          isApproved: item.isApproved,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      : [];

    return {
      success: response.data?.success ?? true,
      message: response.data?.message,
      data: {
        reviews,
        pagination: payload?.pagination ?? {
          page: 1,
          limit: reviews.length || 20,
          total: reviews.length,
          pages: 1,
        },
      } satisfies ReviewListResponse,
    } as ApiResponse<ReviewListResponse>;
  },

  async create(payload: Partial<Review>) {
    const response = await apiClient.post<ApiResponse<Review>>(API_ENDPOINTS.reviews, payload);
    return response.data;
  },

  async update(reviewId: string, payload: Partial<Review>) {
    const response = await apiClient.put<ApiResponse<Review>>(`${API_ENDPOINTS.reviews}/${reviewId}`, payload);
    return response.data;
  },

  async delete(reviewId: string) {
    const response = await apiClient.delete<ApiResponse<Review>>(`${API_ENDPOINTS.reviews}/${reviewId}`);
    return response.data;
  },
};
