import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    profileImage?: string;
  } | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onNavigateHome?: () => void;
  onNavigateHistory?: () => void;
}

export const Layout = ({
  children,
  user,
  onLogin,
  onLogout,
  onNavigateHome,
  onNavigateHistory,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
        onNavigateHome={onNavigateHome}
        onNavigateHistory={onNavigateHistory}
      />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};
