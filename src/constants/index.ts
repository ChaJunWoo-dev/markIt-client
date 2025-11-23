export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "markit_access_token",
  USER: "markit_user",
} as const;

export const FILE_CONSTRAINTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 50,
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
} as const;

export const WATERMARK_TYPES = {
  TEXT: "text",
  IMAGE: "image",
} as const;
