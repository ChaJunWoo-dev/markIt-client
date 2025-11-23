import { useState } from "react";
import { Button, Card, Spinner } from "../components/ui";
import type { WatermarkListResponse } from "../types";

export const HistoryPage = () => {
  const [histories] = useState<WatermarkListResponse[]>([]);
  const [isLoading] = useState(false);

  const handleDownload = (watermarkKey: string) => {
    console.log("Downloading:", watermarkKey);
    // TODO: GET /api/watermarks/{watermarkKey}/download 호출하여 downloadUrl 받기
    // TODO: 받은 downloadUrl로 파일 다운로드
  };

  const handleDelete = (id: string) => {
    console.log("Deleting:", id);
    // TODO: 실제 삭제 API 호출
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 px-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (histories.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-8 text-center py-20">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-semibold mb-2">저장된 작업이 없습니다</h2>
        <p className="text-gray-600">워터마크를 처리하면 여기에 저장됩니다</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">내 작업 목록</h1>

      <div className="space-y-4">
        {histories.map((history) => (
          <Card key={history.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-3xl">🖼️</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">
                    {new Date(history.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">이미지 {history.imageCount}개</p>
                <p className="text-xs text-gray-500">
                  만료: {new Date(history.expiresAt).toLocaleDateString("ko-KR")}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDownload(history.watermarkKey)}
                >
                  ZIP 다운로드
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm("이 작업을 삭제하시겠습니까?")) {
                      handleDelete(history.id);
                    }
                  }}
                >
                  삭제
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
