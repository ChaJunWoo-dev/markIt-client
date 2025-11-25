import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "../constants";
import type { ApiError } from "../types";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getErrorMessage = (
  error: unknown,
  fallback: string = "오류가 발생했습니다"
): string => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const apiError = error.response.data as ApiError;

    return apiError.message || fallback;
  }

  return fallback;
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/api/user")) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
