import React from "react";
import { Outlet } from "react-router-dom";

// Define a type for the Guard component that ensures it accepts children
interface ProtectedRouteProps {
  guard: React.ComponentType<{ children: React.ReactNode }>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ guard: Guard }) => {
  return (
    <Guard>
      <Outlet />
    </Guard>
  );
};

export default ProtectedRoute;
