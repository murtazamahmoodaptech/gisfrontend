import { createContext, useContext, useState, ReactNode } from "react";
import { API_ENDPOINTS } from "@/config/api";
import { getRoleFromToken } from "@/utils/jwt";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
  userRole: 'admin' | 'user' | null;
  setUserRole: (role: 'admin' | 'user' | null) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("admin_auth") === "true"
  );
  const [token, setToken] = useState<string | null>(
    () => sessionStorage.getItem("admin_token")
  );
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(
    () => (sessionStorage.getItem("user_role") as 'admin' | 'user' | null) || null
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        setIsAuthenticated(true);
        setToken(data.token);
        sessionStorage.setItem("admin_auth", "true");
        sessionStorage.setItem("admin_token", data.token);

        // Decode JWT token to extract role
        const role = getRoleFromToken(data.token);
        console.log("[v0] Extracted role from token:", role);
        
        setUserRole(role);
        sessionStorage.setItem("user_role", role || 'user');
        
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUserRole(null);
    sessionStorage.removeItem("admin_auth");
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("user_role");
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, token, userRole, setUserRole }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
