import { apiClient } from "./client";
import type {
  WatermarkResponse,
  WatermarkListResponse,
  WatermarkConfig,
  DownloadUrlResponse,
} from "../types";

export const watermarkApi = {
  preview: async (images: File[], config: WatermarkConfig): Promise<Blob> => {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("position", config.position);
    formData.append("size", config.size.toString());
    formData.append("opacity", config.opacity.toString());

    if (config.type === "text" && config.text) {
      formData.append("text", config.text);
      if (config.color) {
        formData.append("color", config.color);
      }
    } else if (config.type === "image" && config.imageFile) {
      formData.append("watermarkImage", config.imageFile);
    }

    const endpoint =
      config.type === "text" ? "/api/watermarks/preview/text" : "/api/watermarks/preview/image";
    const response = await apiClient.post<Blob>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });

    return response.data;
  },

  save: async (images: File[], config: WatermarkConfig): Promise<WatermarkResponse> => {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("position", config.position);
    formData.append("size", config.size.toString());
    formData.append("opacity", config.opacity.toString());

    if (config.type === "text" && config.text) {
      formData.append("text", config.text);
      if (config.color) {
        formData.append("color", config.color);
      }
    } else if (config.type === "image" && config.imageFile) {
      formData.append("watermarkImage", config.imageFile);
    }

    const endpoint =
      config.type === "text" ? "/api/watermarks/text" : "/api/watermarks/image";
    const response = await apiClient.post<WatermarkResponse>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  getList: async (): Promise<WatermarkListResponse[]> => {
    const response = await apiClient.get<WatermarkListResponse[]>("/api/watermarks");
    return response.data;
  },

  download: async (key: string): Promise<void> => {
    const response = await apiClient.get<DownloadUrlResponse>(`/api/watermarks/${key}/download`);
    const downloadUrl = response.data.downloadUrl;

    window.open(downloadUrl, "_blank");
  },

  delete: async (key: string): Promise<void> => {
    await apiClient.delete(`/api/watermarks/${key}`);
  },
};
