// 사용자 정보
export interface User {
  email: string;
  name: string;
  profileImage?: string;
}

// 워터마크 타입
export type WatermarkType = "text" | "image";

// 워터마크 위치
export type WatermarkPosition =
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | "CENTER";

// 워터마크 설정
export interface WatermarkConfig {
  type: WatermarkType;
  text?: string; // type이 "text"일 때 사용
  imageFile?: File; // type이 "image"일 때 사용
  position: WatermarkPosition;
  size: number; // 1-100
  opacity: number; // 0.0-1.0
}

// 워터마크 생성 응답
export interface WatermarkResponse {
  id: string;
  watermarkKey: string;
  createdAt: string;
  imageCount: number;
  expiresAt: string;
}

// 워터마크 목록 응답
export interface WatermarkListResponse {
  id: string;
  watermarkKey: string;
  imageCount: number;
  createdAt: string;
  expiresAt: string;
}

// 다운로드 URL 응답
export interface DownloadUrlResponse {
  downloadUrl: string;
  expiresInSeconds: number;
}

// API 에러 응답
export interface ApiError {
  message: string;
  code?: string;
}
