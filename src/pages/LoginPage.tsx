import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import { authApi } from "../api/auth";
import { GOOGLE_CONFIG } from "../config/google";
import { FeatureItem } from "../components/login";
import { Modal, Button } from "../components/ui";
import logoImg from "../assets/markit.png";

const FEATURES = [
  {
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    title: "텍스트 & 이미지 워터마크",
    description: "원하는 스타일로 워터마크를 적용하세요",
  },
  {
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    title: "일괄 처리",
    description: "최대 20개의 이미지를 한번에 처리",
  },
  {
    bgColor: "bg-green-100",
    textColor: "text-green-600",
    title: "작업 히스토리",
    description: "로그인하고 처리 내역을 저장하세요",
  },
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

  const handleGoogleCallback = async (response: CredentialResponse) => {
    try {
      const loginResponse = await authApi.loginWithGoogleToken(response.credential);

      // 토큰 저장
      localStorage.setItem("accessToken", loginResponse.token);

      // 유저 정보로 로그인
      login({ name: loginResponse.name });
      navigate(-1);
    } catch (error) {
      setErrorModal({ isOpen: true, message: "로그인에 실패했습니다. 다시 시도해주세요." });
    }
  };

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) {
        return;
      }

      const container = googleButtonRef.current;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CONFIG.clientId,
        callback: handleGoogleCallback,
      });

      window.google.accounts.id.renderButton(container, {
        theme: "outline",
        size: "large",
        width: container.offsetWidth,
        text: "signin_with",
        shape: "rectangular",
        logo_alignment: "left",
      });
    };

    initializeGoogle();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center">
            <img src={logoImg} alt="markIt" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">환영합니다</h1>
            <p className="text-gray-600">간편하게 이미지에 워터마크를 추가하세요</p>
          </div>

          <div className="space-y-3 flex flex-col items-center">
            {FEATURES.map((feature, idx) => (
              <FeatureItem key={idx} {...feature} />
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">로그인하고 시작하기</span>
            </div>
          </div>

          <div ref={googleButtonRef} className="w-full flex justify-center"></div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              로그인 없이도 사용 가능합니다
              <br />
              <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                바로 시작하기 →
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          로그인하면 처리 내역을 저장하고 나중에 다시 다운로드할 수 있습니다
        </p>
      </div>

      {/* 에러 모달 */}
      <Modal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        title="로그인 오류"
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
