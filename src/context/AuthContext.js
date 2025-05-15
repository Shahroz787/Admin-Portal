"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.replace("/"); // Redirect to login page
    }
    setIsLoading(false); // ← This is the key issue
  }, []);
  

  console.log("Rendering children in AuthProvider...");
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated , isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);