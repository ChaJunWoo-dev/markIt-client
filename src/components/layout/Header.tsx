import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { Button } from "../ui";
import logoImg from "../../assets/markit.png";

export const Header = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    // TODO: Google OAuth 로그인
    // 임시로 테스트 유저 로그인
    login(
      {
        id: "temp-user-id",
        email: "user@example.com",
        name: "테스트 사용자",
      },
      "temp-token"
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b">
      <div className="w-full max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-70 transition-opacity cursor-pointer">
          <img src={logoImg} alt="markIt" className="h-10" />
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <button
              onClick={() => navigate("/history")}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
            >
              내 작업 목록
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              {user.profileImage && (
                <img src={user.profileImage} alt={user.name} className="w-8 h-8 rounded-full" />
              )}
              <span className="text-gray-700">{user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <Button onClick={handleLogin}>로그인</Button>
          )}
        </div>
      </div>
    </header>
  );
};
