import { useState } from "react";
import type { ChangeEvent } from "react";
import { useAuth } from "../contexts";
import { Button, Card, Input } from "../components/ui";
import type { WatermarkType } from "../types";
import { FILE_CONSTRAINTS } from "../constants";

export const WatermarkPage = () => {
  const { isAuthenticated } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [watermarkType, setWatermarkType] = useState<WatermarkType>("text");
  const [textContent, setTextContent] = useState("");
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages((prev) => [...prev, ...files].slice(0, FILE_CONSTRAINTS.MAX_FILES));
  };

  const handleWatermarkImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setWatermarkImage(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProcess = () => {
    if (images.length === 0) {
      alert("이미지를 업로드해주세요");

      return;
    }

    if (watermarkType === "text" && !textContent.trim()) {
      alert("워터마크 텍스트를 입력해주세요");

      return;
    }

    if (watermarkType === "image" && !watermarkImage) {
      alert("워터마크 이미지를 업로드해주세요");

      return;
    }

    // TODO: 실제 API 호출
    const config = watermarkType === "text" ? { text: textContent } : { file: watermarkImage };
    console.log("Processing:", { images, watermarkType, config });

    setIsProcessing(true);
    setTimeout(() => {
      alert("처리가 완료되었습니다!");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">워터마크 적용</h1>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">1. 이미지 업로드</h2>

        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-600 mb-2">클릭하거나 드래그하여 이미지 업로드</p>
            <p className="text-sm text-gray-500">최대 20개, 각 10MB 이하</p>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </label>

        {images.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">업로드된 이미지: {images.length}개</p>
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 8).map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              {images.length > 8 && (
                <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center text-gray-600">
                  +{images.length - 8}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">2. 워터마크 설정</h2>

        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="watermarkType"
              value="text"
              checked={watermarkType === "text"}
              onChange={() => setWatermarkType("text")}
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
              onChange={() => setWatermarkType("image")}
              className="w-4 h-4"
            />
            <span>이미지</span>
          </label>
        </div>

        {watermarkType === "text" && (
          <Input
            label="워터마크 텍스트"
            placeholder="워터마크로 사용할 텍스트를 입력하세요"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
          />
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
            {watermarkImage && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(watermarkImage)}
                  alt="Watermark preview"
                  className="w-32 h-32 object-contain border rounded"
                />
              </div>
            )}
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">
              {isAuthenticated ? "처리 후 저장" : "처리 후 즉시 다운로드"}
            </p>
            <p className="text-sm text-gray-600">
              {isAuthenticated
                ? "처리된 결과가 저장되며, 나중에 목록에서 다운로드할 수 있습니다"
                : "로그인하면 처리 결과를 저장할 수 있습니다"}
            </p>
          </div>
          <Button
            size="md"
            onClick={handleProcess}
            isLoading={isProcessing}
            disabled={images.length === 0}
          >
            {isAuthenticated ? "처리하고 저장" : "처리하고 다운로드"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
