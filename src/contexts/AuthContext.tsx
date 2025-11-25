import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";
import { STORAGE_KEYS } from "../constants";
import { authApi } from "../api/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("인증 정보를 불러올 수 없습니다");
  }
  return context;
};
