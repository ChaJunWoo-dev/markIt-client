import { useNavigate } from "react-router-dom";
import { Button, Card, StepItem } from "../components/ui";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="text-center py-24 px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
          이미지에 워터마크를
          <br />
          쉽고 빠르게
        </h1>
        <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          텍스트나 이미지 워터마크를 여러 이미지에 한번에 적용하세요
        </p>
        <Button size="lg" onClick={() => navigate("/watermark")}>
          시작하기
        </Button>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-10">
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-6">⚡</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">빠른 처리</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              여러 이미지를 동시에 처리하여 시간을 절약하세요
            </p>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-6">🎨</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">다양한 옵션</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              텍스트 또는 이미지 워터마크를 선택할 수 있습니다
            </p>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-6">💾</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">작업 저장</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              로그인하면 처리 결과를 저장하고 나중에 다운로드할 수 있습니다
            </p>
          </Card>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-15 mt-10">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-14">사용 방법</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <StepItem
              number={1}
              title="이미지 업로드"
              description="워터마크를 적용할 이미지를 업로드하세요 (최대 20개)"
            />
            <StepItem
              number={2}
              title="워터마크 설정"
              description="텍스트 또는 이미지 워터마크를 선택하고 설정하세요"
            />
            <StepItem
              number={3}
              title="다운로드"
              description="처리된 이미지를 ZIP 파일로 다운로드하세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
