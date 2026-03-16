import { createContext, useContext, useState, ReactNode } from "react";
import { API_ENDPOINTS } from "@/config/api";

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
        console.log("[v0] Login response:", data);
        setIsAuthenticated(true);
        setToken(data.token);
        sessionStorage.setItem("admin_auth", "true");
        sessionStorage.setItem("admin_token", data.token);

        // Try to fetch current user to get role
        try {
          const userResponse = await fetch(API_ENDPOINTS.AUTH.CURRENT_USER, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${data.token}`,
              "Content-Type": "application/json",
            },
          });
          
          const userData = await userResponse.json();
          console.log("[v0] Current user data:", userData);
          
          // Extract role from response - handle different response structures
          const role = userData.role || userData.data?.role || data.role || 'user';
          console.log("[v0] Detected role from current user:", role);
          
          setUserRole(role);
          sessionStorage.setItem("user_role", role);
          console.log("[v0] Stored user role in sessionStorage:", role);
        } catch (error) {
          console.error("[v0] Error fetching current user:", error);
          // If current user endpoint fails, try to use role from login response
          const role = data.role || 'user';
          setUserRole(role);
          sessionStorage.setItem("user_role", role);
          console.log("[v0] Fallback - Set role to:", role);
        }
        
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
