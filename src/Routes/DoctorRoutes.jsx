import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiHelpCircle, FiLogOut, FiUserPlus } from "react-icons/fi";

import Login from "src/Pages/Doctor/Login.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import SignUp from "src/Pages/Doctor/SignUp.jsx";
import UploadDoctorId from "src/Pages/Doctor/UploadDoctorId.jsx";
import UploadProfilePic from "src/Pages/Doctor/UploadProfilePic.jsx";
import ForgotPassword from "src/Pages/Doctor/ForgotPassword.jsx";
import ProtectedRoute from "src/Utilities/Doctor/ProtectedRoute.jsx";
import Dashboard from "src/Pages/Doctor/Dashboard.jsx";
import PatientProfile from "src/Pages/Doctor/PatientProfile.jsx";
import Diagnose from "src/Pages/Doctor/Diagnose.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";
import { GeneralDetails } from "src/Pages/Doctor/GeneralDetails.jsx";
import { FaCreditCard, FaUsers } from "react-icons/fa6";
import ManageSubscription from "src/Pages/Doctor/ManageSubscription";

const PublicLayout = () => {
  const menuItems = [
    {
      name: "Home",
      link: "/",
      icon: FiHome,
    },
    {
      name: "Create Account",
      link: "/doctor/signup",
      icon: FiUserPlus,
    },
    {
      name: "Support",
      link: "/support",
      icon: FiHelpCircle,
    },
  ];

  return (
    <>
      <EmptyHead showNavigation={true} menuItems={menuItems} />
      <Outlet />
    </>
  );
};

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("DoctorAccount")) || "";
  const handleLogout = () => {
    localStorage.removeItem("DoctorToken");
    localStorage.removeItem("DoctorAccount");
    navigate("/doctor/login", { replace: true }); // Navigate to login
  };

  const menuItems = [
    {
      name: "Dashboard",
      link: "/doctor/",
      icon: FiHome,
    },
    {
      name: !account.subscriptionId
        ? "Buy Subscription"
        : "Manage Subscription",
      link: account.subscriptionId?"/doctor/manage-subscription":"/pricing",
      icon: account.subscriptionId? FaUsers :FaCreditCard,
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

const DoctorRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/update-profile" element={<GeneralDetails />} />
      <Route path="/upload-id" element={<UploadDoctorId />} />
      <Route path="/upload-profile" element={<UploadProfilePic />} />
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
      <Route path="/patient/:id" element={<PatientProfile />} />
      <Route path="/diagnose/:id" element={<Diagnose />} />
      <Route path="/manage-subscription" element={<ManageSubscription />} />

    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default DoctorRoutes;
