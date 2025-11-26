import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Card } from "../ui";
import { FILE_CONSTRAINTS } from "../../constants";

interface ImageUploadSectionProps {
  images: File[];
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

export const ImageUploadSection = ({ images, onUpload, onRemove }: ImageUploadSectionProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setImageUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <Card className="mb-4 md:mb-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">1. 이미지 업로드</h2>

      <label className="block">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
          <div className="text-3xl md:text-4xl mb-2">📁</div>
          <p className="text-sm md:text-base text-gray-600 mb-2">클릭하거나 드래그하여 이미지 업로드</p>
          <p className="text-xs md:text-sm text-gray-500">최대 {FILE_CONSTRAINTS.MAX_FILES}개, 각 10MB 이하</p>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={onUpload}
            className="hidden"
          />
        </div>
      </label>

      {images.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">업로드된 이미지: {images.length}개</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {images.slice(0, 8).map((_, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrls[index]}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  onClick={() => onRemove(index)}
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
  );
};
