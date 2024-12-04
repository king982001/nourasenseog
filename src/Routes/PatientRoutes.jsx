import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Login from "src/Pages/Patient/Login.jsx";
import SignUp from "src/Pages/Patient/SignUp.jsx";
import Dashboard from "src/Pages/Patient/Dashboard.jsx";
import Diagnose from "src/Pages/Patient/Diagnose.jsx";
import PatientProfile from "src/Pages/Patient/PatientProfile.jsx";
import ProtectedRoute from "src/Utilities/Patient/ProtectedRoute.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import ForgotPassword from "src/Pages/Patient/ForgotPassword.jsx";
import GeneralDetails from "src/Pages/Patient/GeneralDetails.jsx";
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
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    navigate("/login", { replace: true }); // Navigate to login
  };

  return (
    <>
      <EmptyHead showLogoutBtn={true} logoutHandler={handleLogout} />
      <Outlet />
    </>
  );
};

const PatientRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<SignUp />} />
      <Route path={"/update-profile"} element={<GeneralDetails />} />
      <Route path={"/forgot-password"} element={<ForgotPassword />} />
    </Route>
    <Route
      element={
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      }
    >
      <Route path={"/dashboard"} element={<Dashboard />} />
      <Route path={"/child/:id"} element={<PatientProfile />} />
      <Route path={"/child/diagnose/:id"} element={<Diagnose />} />
    </Route>
    <Route path={"*"} element={<NotFoundPage />} />
  </Routes>
);

export default PatientRoutes;
