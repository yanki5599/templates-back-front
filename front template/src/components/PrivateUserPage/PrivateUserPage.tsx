import React from "react";
import "./PrivateUserPage.css";

interface PrivateUserPageProps {
  children: React.ReactNode;
}

const PrivateUserPage: React.FC<PrivateUserPageProps> = ({ children }) => {
  return <> {children}</>;
};

export default PrivateUserPage;
