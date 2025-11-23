export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
}

export type WatermarkType = "text" | "image";

export interface TextWatermarkConfig {
  type: "text";
  text: string;
}

export interface ImageWatermarkConfig {
  type: "image";
  file: File;
}

export type WatermarkConfig = TextWatermarkConfig | ImageWatermarkConfig;

export interface WatermarkRequest {
  images: File[];
  watermark: WatermarkConfig;
}

export interface WatermarkHistory {
  id: string;
  userId: string;
  createdAt: string;
  imageCount: number;
  thumbnailUrl?: string;
  watermarkType: WatermarkType;
  downloadUrl: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthToken {
  accessToken: string;
  expiresIn: number;
}
