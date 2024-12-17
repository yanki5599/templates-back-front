import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Navigate } from "react-router-dom";

interface PrivateAdminGuardProps {
  children: React.ReactNode;
}

const PrivateAdminGuard: React.FC<PrivateAdminGuardProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const isAllowed = () => user && user?.isAdmin;

  return <> {isAllowed() ? children : <Navigate to="/unauthorized" />}</>;
};

export default PrivateAdminGuard;
