import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Card, Input } from "../ui";
import type { WatermarkType, WatermarkPosition } from "../../types";

interface WatermarkConfigSectionProps {
  watermarkType: WatermarkType;
  onTypeChange: (type: WatermarkType) => void;
  textContent: string;
  onTextContentChange: (text: string) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
  watermarkImage: File | null;
  onWatermarkImageChange: (file: File | null) => void;
  position: WatermarkPosition;
  onPositionChange: (position: WatermarkPosition) => void;
  size: number;
  onSizeChange: (size: number) => void;
  opacity: number;
  onOpacityChange: (opacity: number) => void;
}

export const WatermarkConfigSection = ({
  watermarkType,
  onTypeChange,
  textContent,
  onTextContentChange,
  textColor,
  onTextColorChange,
  watermarkImage,
  onWatermarkImageChange,
  position,
  onPositionChange,
  size,
  onSizeChange,
  opacity,
  onOpacityChange,
}: WatermarkConfigSectionProps) => {
  const [watermarkImageUrl, setWatermarkImageUrl] = useState<string>("");

  useEffect(() => {
    if (watermarkImage) {
      const url = URL.createObjectURL(watermarkImage);
      setWatermarkImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setWatermarkImageUrl("");
    }
  }, [watermarkImage]);

  const handleWatermarkImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onWatermarkImageChange(file);
    }
  };

  return (
    <Card className="mb-4 md:mb-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">2. 워터마크 설정</h2>

      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="watermarkType"
            value="text"
            checked={watermarkType === "text"}
            onChange={() => onTypeChange("text")}
            className="w-4 h-4"
          />
          <span>텍스트</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="watermarkType"
            value="image"
            checked={watermarkType === "image"}
            onChange={() => onTypeChange("image")}
            className="w-4 h-4"
          />
          <span>이미지</span>
        </label>
      </div>

      {watermarkType === "text" && (
        <div className="space-y-4">
          <Input
            label="워터마크 텍스트"
            placeholder="워터마크로 사용할 텍스트를 입력하세요"
            value={textContent}
            onChange={(e) => onTextContentChange(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">텍스트 색상</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
                className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
                placeholder="#000000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {watermarkType === "image" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">워터마크 이미지</label>
          <input
            type="file"
            accept="image/png"
            onChange={handleWatermarkImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {watermarkImage && watermarkImageUrl && (
            <div className="mt-2">
              <img
                src={watermarkImageUrl}
                alt="Watermark preview"
                className="w-32 h-32 object-contain border rounded"
              />
            </div>
          )}
        </div>
      )}

      <div className="mt-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">위치</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "TOP_LEFT", label: "왼쪽 위" },
              { value: "TOP_RIGHT", label: "오른쪽 위" },
              { value: "CENTER", label: "중앙" },
              { value: "BOTTOM_LEFT", label: "왼쪽 아래" },
              { value: "BOTTOM_RIGHT", label: "오른쪽 아래" },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onPositionChange(value as WatermarkPosition)}
                className={`px-3 md:px-4 py-2 border rounded text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                  position === value
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">크기: {size}%</label>
          <input
            type="range"
            min="1"
            max="100"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>작게</span>
            <span>크게</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            투명도: {opacity}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>불투명</span>
            <span>투명</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
