import { useEffect, useState } from "react";
import { Button, Card, Spinner, Modal } from "../components/ui";
import type { WatermarkListResponse } from "../types";
import { watermarkApi } from "../api/watermark";
import { getErrorMessage } from "../api/client";

export const HistoryPage = () => {
  const [histories, setHistories] = useState<WatermarkListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "",
  });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; key: string | null }>({
    isOpen: false,
    key: null,
  });

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const data = await watermarkApi.getList();
        setHistories(data);
      } catch (error) {
        setErrorModal({
          isOpen: true,
          message: getErrorMessage(error, "목록을 불러오는데 실패했습니다."),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const handleDownload = async (key: string) => {
    try {
      await watermarkApi.download(key);
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: getErrorMessage(error, "다운로드에 실패했습니다."),
      });
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await watermarkApi.delete(key);
      setHistories((prev) => prev.filter((history) => history.key !== key));
      setDeleteModal({ isOpen: false, key: null });
    } catch (error) {
      setDeleteModal({ isOpen: false, key: null });
      setErrorModal({
        isOpen: true,
        message: getErrorMessage(error, "삭제에 실패했습니다."),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 px-4 md:px-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (histories.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center py-12 md:py-20">
        <div className="text-5xl md:text-6xl mb-4">📦</div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">저장된 작업이 없습니다</h2>
        <p className="text-sm md:text-base text-gray-600">워터마크를 처리하면 여기에 저장됩니다</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">내 작업 목록</h1>

      <div className="space-y-4">
        {histories.map((history) => (
          <Card key={history.key} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                {history.thumbnailUrl ? (
                  <img
                    src={history.thumbnailUrl}
                    alt="썸네일"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl">🖼️</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {new Date(history.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-1">이미지 {history.imageCount}개</p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDownload(history.key)}
                  className="flex-1 sm:flex-none"
                >
                  다운로드
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteModal({ isOpen: true, key: history.key })}
                  className="flex-1 sm:flex-none"
                >
                  삭제
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, key: null })}
        title="삭제 확인"
      >
        <p className="mb-6">이 작업을 삭제하시겠습니까?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteModal({ isOpen: false, key: null })}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (deleteModal.key) {
                handleDelete(deleteModal.key);
              }
            }}
          >
            삭제
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        title="오류"
      >
        <p className="mb-6">{errorModal.message}</p>
        <div className="flex justify-end">
          <Button variant="primary" onClick={() => setErrorModal({ isOpen: false, message: "" })}>
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
};
