
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // For demo purposes, we'll use localStorage to persist the user
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    try {
      // This is just for demonstration - in real app would validate with a backend
      if (email && password) {
        const mockUser = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          username: email.split("@")[0],
          email,
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    // Simulate API call
    try {
      // This is just for demonstration - in real app would register with a backend
      if (username && email && password) {
        const mockUser = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          username,
          email,
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid registration data");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      register,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
