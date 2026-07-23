import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "./api";
import type { ApiResponse, Cart, CartItem } from "@/types";

interface CartItemPayload {
  product: string | number;
  variant?: string | null;
  quantity?: number;
  price?: number;
  currency?: string;
  subtotal?: number;
}

const unwrap = <T>(response: ApiResponse<T> | T | null | undefined): T | null => {
  if (!response) return null;
  if (typeof response === "object" && "data" in response && (response as ApiResponse<T>).data !== undefined) {
    return (response as ApiResponse<T>).data;
  }

  return response as T;
};

export const cartService = {
  async list() {
    const response = await apiClient.get<ApiResponse<Cart>>(API_ENDPOINTS.cart);
    return unwrap(response.data) as Cart | null;
  },

  async addItem(payload: CartItemPayload) {
    const response = await apiClient.post<ApiResponse<Cart>>(API_ENDPOINTS.cart, payload);
    return unwrap(response.data) as Cart | null;
  },

  async updateItem(cartItemId: string, payload: Partial<CartItem>) {
    const response = await apiClient.put<ApiResponse<Cart>>(`${API_ENDPOINTS.cart}/${cartItemId}`, payload);
    return unwrap(response.data) as Cart | null;
  },

  async removeItem(cartItemId: string) {
    const response = await apiClient.delete<ApiResponse<Cart>>(`${API_ENDPOINTS.cart}/${cartItemId}`);
    return unwrap(response.data) as Cart | null;
  },

  async clear() {
    const response = await apiClient.delete<ApiResponse<Cart>>(API_ENDPOINTS.cart);
    return unwrap(response.data) as Cart | null;
  },
};
