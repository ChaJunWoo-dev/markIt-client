import { apiClient } from "./client";
import type { User, LoginResponse } from "../types";

export const authApi = {
  loginWithGoogleToken: async (idToken: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/api/auth/google", {
      idToken,
    });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>("/api/user");
    return response.data;
  },
};
