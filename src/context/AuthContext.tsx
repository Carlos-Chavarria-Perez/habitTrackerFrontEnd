import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthUser, JwtPayload } from "../types/Auth";

type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (user: AuthUser) => setUser(user);

  const logout=()=>{
    localStorage.removeItem("token")
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return;
      }
      setUser({
        user_id: decoded.user_id,
        username: decoded.username,
      });
    } catch {
      localStorage.removeItem("token");
    }
  },[]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
