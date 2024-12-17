import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateUserGuard from "./components/guards/PrivateUserGuard/PrivateUserGuard";
import PrivateAdminGuard from "./components/guards/PrivateAdminGuard/PrivateAdminGuard";
import ProtectedRoute from "./components/guards/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<HomePage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* User Protected Routes */}
      <Route element={<ProtectedRoute guard={PrivateUserGuard} />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute guard={PrivateAdminGuard} />}>
          <Route path="/admin" element={<>Admin Page</>} />
          <Route path="/admin/settings" element={<>Admin Settings Page</>} />
        </Route>
      </Route>

      {/*not found page*/}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
