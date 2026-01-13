import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
// import type { ReactNode } from "react";

interface Props {
  children: React. ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Only access localStorage on the client side
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // During SSR or initial load, show nothing or a loader
  if (isAuthenticated === null) {
    return null; // or return <div>Loading...</div>
  }

  // If no token, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render children
  return children;
};

export default ProtectedRoute;