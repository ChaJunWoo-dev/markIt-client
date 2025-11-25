export interface User {
  name: string;
}

export interface LoginResponse {
  token: string;
  name: string;
}

export type WatermarkType = "text" | "image";

export type WatermarkPosition =
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | "CENTER";

export interface WatermarkConfig {
  type: WatermarkType;
  text?: string;
  color?: string;
  imageFile?: File;
  position: WatermarkPosition;
  size: number;
  opacity: number;
}

export interface WatermarkResponse {
  id: string;
  watermarkKey: string;
  createdAt: string;
  imageCount: number;
  expiresAt: string;
}

export interface WatermarkListResponse {
  key: string;
  imageCount: number;
  createdAt: string;
  expiresAt: string;
  thumbnailUrl: string;
}

export interface DownloadUrlResponse {
  downloadUrl: string;
  expiresInSeconds: number;
}

export interface ApiError {
  message: string;
  code?: string;
}
