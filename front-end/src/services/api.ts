//services/api.ts
import axios from "axios";
import { env } from "@/config/env";
import { storageKeys } from "@/constants/storageKeys";
import { getStorageItem, removeStorageItem, setStorageItem } from "@/utils/storage";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getStorageItem<string>(storageKeys.authToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getStorageItem<string>(storageKeys.refreshToken);

      if (!refreshToken) {
        removeStorageItem(storageKeys.authToken);
        removeStorageItem(storageKeys.refreshToken);
        removeStorageItem(storageKeys.user);
        return Promise.reject(error);
      }

      try {
        const response = await apiClient.post("/auth/refresh", { refreshToken });
        const newAccessToken = response.data?.data?.accessToken;
        const newRefreshToken = response.data?.data?.refreshToken;

        if (newAccessToken) {
          setStorageItem(storageKeys.authToken, newAccessToken);
          if (newRefreshToken) {
            setStorageItem(storageKeys.refreshToken, newRefreshToken);
          }
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch {
        removeStorageItem(storageKeys.authToken);
        removeStorageItem(storageKeys.refreshToken);
        removeStorageItem(storageKeys.user);
      }
    }

    return Promise.reject(error);
  },
);

export const createApiClient = () => apiClient;
