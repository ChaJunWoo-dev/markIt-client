import { Button } from "../ui";
import logoImg from "../../assets/markit.png";

interface HeaderProps {
  user?: {
    name: string;
    profileImage?: string;
  } | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onNavigateHome?: () => void;
  onNavigateHistory?: () => void;
}

export const Header = ({
  user,
  onLogin,
  onLogout,
  onNavigateHome,
  onNavigateHistory,
}: HeaderProps) => {
  return (
    <header className="bg-white border-b">
      <div className="w-full max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="flex items-center hover:opacity-70 transition-opacity cursor-pointer"
        >
          <img src={logoImg} alt="markIt" className="h-10" />
        </button>

        <div className="flex items-center gap-4">
          {user && (
            <button
              onClick={onNavigateHistory}
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
              <Button variant="outline" onClick={onLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <Button onClick={onLogin}>로그인</Button>
          )}
        </div>
      </div>
    </header>
  );
};
