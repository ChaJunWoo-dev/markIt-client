import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui";
import logoImg from "../../assets/markit.png";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center hover:opacity-70 transition-opacity cursor-pointer"
        >
          <img src={logoImg} alt="markIt" className="h-8 md:h-10" />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {user && (
            <button
              onClick={() => navigate("/history")}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer text-sm md:text-base"
            >
              <span className="hidden sm:inline">내 작업 목록</span>
              <span className="sm:hidden">목록</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-gray-700 text-sm md:text-base hidden sm:inline">{user.name}</span>
              <Button variant="outline" onClick={handleLogout} size="sm">
                로그아웃
              </Button>
            </div>
          ) : (
            <Button onClick={handleLogin} size="sm">로그인</Button>
          )}
        </div>
      </div>
    </header>
  );
};
