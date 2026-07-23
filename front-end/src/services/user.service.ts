import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "./api";
import type { ApiResponse, User } from "@/types";

export const userService = {
  async getProfile() {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.auth.me);
    return response.data;
  },
};
