import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button, Modal } from "../components/ui";
import { ImageUploadSection, WatermarkConfigSection, ProcessSection } from "../components/watermark";
import { useWatermark } from "../hooks/useWatermark";
import { watermarkApi } from "../api/watermark";
import { getErrorMessage } from "../api/client";

export const WatermarkPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
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
  } = useWatermark(isAuthenticated);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 md:px-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">워터마크 적용</h1>

      <ImageUploadSection
        images={images}
        onUpload={handleImageUpload}
        onRemove={handleRemoveImage}
      />

      <WatermarkConfigSection
        watermarkType={watermarkType}
        onTypeChange={setWatermarkType}
        textContent={textContent}
        onTextContentChange={setTextContent}
        textColor={textColor}
        onTextColorChange={setTextColor}
        watermarkImage={watermarkImage}
        onWatermarkImageChange={setWatermarkImage}
        position={position}
        onPositionChange={setPosition}
        size={size}
        onSizeChange={setSize}
        opacity={opacity}
        onOpacityChange={setOpacity}
      />

      <ProcessSection
        isAuthenticated={isAuthenticated}
        isProcessing={isProcessing}
        disabled={images.length === 0}
        onProcess={handleProcess}
      />

      <Modal
        isOpen={successModal.isOpen}
        onClose={() => {}}
        title="처리 완료"
        showCloseButton={false}
      >
        <p className="mb-6">처리가 완료되었습니다!</p>
        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={async () => {
              console.log("즉시 다운로드 클릭, key:", successModal.key);
              if (successModal.key) {
                try {
                  console.log("다운로드 API 호출 시작");
                  await watermarkApi.download(successModal.key);
                  console.log("다운로드 API 호출 완료");
                  setSuccessModal({ isOpen: false, key: "" });
                  resetForm();
                } catch (error) {
                  console.error("다운로드 에러:", error);
                  setSuccessModal({ isOpen: false, key: "" });
                  setErrorModal({
                    isOpen: true,
                    message: getErrorMessage(error, "다운로드에 실패했습니다."),
                  });
                }
              } else {
                console.log("key가 없습니다");
              }
            }}
          >
            즉시 다운로드
          </Button>
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            onClick={() => {
              setSuccessModal({ isOpen: false, key: "" });
              resetForm();
              navigate("/history");
            }}
          >
            목록으로 가기
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
