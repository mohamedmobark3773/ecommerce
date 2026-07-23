import { API_ENDPOINTS } from "@/constants/api";
import { apiClient } from "./api";
import type { ApiResponse, AuthState, User } from "@/types";

interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(payload: { email: string; password: string }) {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>(API_ENDPOINTS.auth.login, payload);
    return response.data;
  },

  async register(payload: { fullName: string; email: string; password: string }) {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>(API_ENDPOINTS.auth.register, payload);
    return response.data;
  },

  async getMe() {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.auth.me);
    return response.data;
  },

  async logout() {
    const response = await apiClient.post<ApiResponse<null>>(API_ENDPOINTS.auth.logout);
    return response.data;
  },

  async refreshToken(refreshToken: string) {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>(API_ENDPOINTS.auth.refresh, { refreshToken });
    return response.data;
  },

  getInitialState(): AuthState {
    return {
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    };
  },
};
