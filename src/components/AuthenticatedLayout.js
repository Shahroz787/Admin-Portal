"use client";

import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function AuthenticatedLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-screen">
      <div className="glow-ring"></div>
      <p>Loading...</p>
    </div>
  }

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full py-20 md:py-14 lg:py-6 md:px-1 lg:px-4 md:w-4/5 lg:w-4/5 xl:w-4/5 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
