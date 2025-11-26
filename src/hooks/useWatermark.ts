import { useState } from "react";
import type { ChangeEvent } from "react";
import type { WatermarkType, WatermarkPosition } from "../types";
import { watermarkApi } from "../api/watermark";
import { getErrorMessage } from "../api/client";
import { FILE_CONSTRAINTS } from "../constants";

export const useWatermark = (isAuthenticated: boolean) => {
  const [images, setImages] = useState<File[]>([]);
  const [watermarkType, setWatermarkType] = useState<WatermarkType>("text");
  const [textContent, setTextContent] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [position, setPosition] = useState<WatermarkPosition>("BOTTOM_RIGHT");
  const [size, setSize] = useState(10);
  const [opacity, setOpacity] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [successModal, setSuccessModal] = useState({ isOpen: false, key: "" });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files].slice(0, FILE_CONSTRAINTS.MAX_FILES));
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setImages([]);
    setWatermarkType("text");
    setTextContent("");
    setTextColor("#000000");
    setWatermarkImage(null);
    setPosition("BOTTOM_RIGHT");
    setSize(10);
    setOpacity(50);
  };

  const handleProcess = async () => {
    if (images.length === 0) {
      setErrorModal({ isOpen: true, message: "이미지를 업로드해주세요" });
      return;
    }

    if (watermarkType === "text" && !textContent.trim()) {
      setErrorModal({ isOpen: true, message: "워터마크 텍스트를 입력해주세요" });
      return;
    }

    if (watermarkType === "image" && !watermarkImage) {
      setErrorModal({ isOpen: true, message: "워터마크 이미지를 업로드해주세요" });
      return;
    }

    const config = {
      type: watermarkType,
      ...(watermarkType === "text"
        ? { text: textContent, color: textColor }
        : { imageFile: watermarkImage! }),
      position,
      size,
      opacity: (100 - opacity) / 100,
    };

    setIsProcessing(true);

    try {
      if (isAuthenticated) {
        const response = await watermarkApi.save(images, config);
        console.log(response.key);
        setSuccessModal({ isOpen: true, key: response.key });
      } else {
        const blob = await watermarkApi.preview(images, config);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = `watermarked-images-${Date.now()}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: getErrorMessage(error, "처리 중 오류가 발생했습니다. 다시 시도해주세요."),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    images,
    watermarkType,
    setWatermarkType,
    textContent,
    setTextContent,
    textColor,
    setTextColor,
    watermarkImage,
    setWatermarkImage,
    position,
    setPosition,
    size,
    setSize,
    opacity,
    setOpacity,
    isProcessing,
    errorModal,
    setErrorModal,
    successModal,
    setSuccessModal,
    handleImageUpload,
    handleRemoveImage,
    resetForm,
    handleProcess,
  };
};
