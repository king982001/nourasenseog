import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Login from "src/Pages/Doctor/Login.jsx";
import DataProvider from "src/Context/Doctor/DataProvider.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import SignUp from "src/Pages/Doctor/SignUp.jsx";
import UpdateProfileDoc from "src/Pages/Doctor/UpdateProfileDoc.jsx";
import UpdateProfileDoc2 from "src/Pages/Doctor/UpdateProfileDoc2.jsx";
import UpdateProfileDoc3 from "src/Pages/Doctor/UpdateProfileDoc3.jsx";
import UpdateProfileDoc4 from "src/Pages/Doctor/UpdateProfileDoc4.jsx";
import ForgotPassword from "src/Pages/Doctor/ForgotPassword.jsx";
import ProtectedRoute from "src/Utilities/Doctor/ProtectedRoute.jsx";
import Dashboard from "src/Pages/Doctor/Dashboard.jsx";
import PatientProfile from "src/Pages/Doctor/PatientProfile.jsx";
import Diagnose from "src/Pages/Doctor/Diagnose.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";

const PublicLayout = () => (
  <>
    <EmptyHead />
    <Outlet />
  </>
);

const ProtectedLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("DoctorToken");
    localStorage.removeItem("DoctorAccount");
    navigate("/doctor/login", { replace: true }); // Navigate to login
  };

  return (
    <>
      <EmptyHead showLogoutBtn={true} logoutHandler={handleLogout} />
      <Outlet />
    </>
  );
};

const DoctorRoutes = () => (
  <DataProvider>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/updateProfileDoc" element={<UpdateProfileDoc />} />
        <Route path="/updateProfileDoc2" element={<UpdateProfileDoc2 />} />
        <Route path="/updateProfileDoc3" element={<UpdateProfileDoc3 />} />
        <Route path="/updateProfileDoc4" element={<UpdateProfileDoc4 />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/diagnose/:id" element={<Diagnose />} />
        <Route path="/patient/:id" element={<PatientProfile />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </DataProvider>
);

export default DoctorRoutes;
