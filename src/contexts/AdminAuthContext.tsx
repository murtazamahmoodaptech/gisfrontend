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
        setIsAuthenticated(true);
        setToken(data.token);
        sessionStorage.setItem("admin_auth", "true");
        sessionStorage.setItem("admin_token", data.token);

        // Try to fetch user list to find current user and get their role
        try {
          const usersResponse = await fetch(API_ENDPOINTS.USERS.LIST, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${data.token}`,
              "Content-Type": "application/json",
            },
          });
          
          if (usersResponse.ok) {
            const usersData = await usersResponse.json();
            
            // Try to find the current user in the list
            // Assuming the response contains user email in the login data or we can extract from token
            let currentUserRole = 'user';
            
            if (usersData.data && Array.isArray(usersData.data)) {
              // Look for user with matching email if available
              if (data.email) {
                const currentUser = usersData.data.find((user: any) => user.email === data.email);
                if (currentUser && currentUser.role) {
                  currentUserRole = currentUser.role;
                }
              }
            }
            
            setUserRole(currentUserRole);
            sessionStorage.setItem("user_role", currentUserRole);
          } else {
            // If users endpoint fails, default to 'user'
            setUserRole('user');
            sessionStorage.setItem("user_role", 'user');
          }
        } catch (error) {
          console.error("[v0] Error fetching users:", error);
          // Default to user role if fetch fails
          setUserRole('user');
          sessionStorage.setItem("user_role", 'user');
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
