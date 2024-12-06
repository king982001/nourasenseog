import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "src/Pages/Admin/Login.jsx";
import { FiHome, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { Dashboard } from "src/Pages/Admin/Dashboard.jsx";
import ProtectedRoute from "src/Utilities/Admin/ProtectedRoute.jsx";
import { VerifyDoctor } from "src/Pages/Admin/VerifyDoctor.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";
import React from "react";

const PublicLayout = () => (
  <>
    <EmptyHead />
    <Outlet />
  </>
);

const ProtectedLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AdminToken");
    navigate("/admin/login", { replace: true }); // Navigate to login
  };

  const menuItems = [
    {
      name: "Home",
      link: "/admin/",
      icon: FiHome,
    },
    {
      name: "Support",
      link: "/support",
      icon: FiHelpCircle,
    },
    {
      name: "Logout",
      onClick: handleLogout,
      icon: FiLogOut,
    },
  ];

  return (
    <>
      <EmptyHead showNavigation={true} menuItems={menuItems} />
      <Outlet />
    </>
  );
};

const AdminRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path={"/admin/login"} element={<Login />} />
    </Route>
    <Route
      element={
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/verify/:doctorID" element={<VerifyDoctor />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AdminRoutes;
