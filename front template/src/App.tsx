import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateUserGuard from "./components/guards/PrivateUserGuard/PrivateUserGuard";
import PrivateAdminGuard from "./components/guards/PrivateAdminGuard/PrivateAdminGuard";
import ProtectedRoute from "./components/guards/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { Button } from "@mui/material";
import { fetchLogout } from "./store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const logout = () => {
    dispatch(fetchLogout()).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        window.location.href = "/";
      }
    });
  };

  return (
    <>
      <Button onClick={logout}>Logout</Button>
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
    </>
  );
};

export default App;
