import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/Doctor/LandingPage.jsx";
import Login from "../Pages/Doctor/Login.jsx";
import DataProvider from "../Context/Doctor/DataProvider.jsx";
import NotFoundPage from "../Pages/NotFoundPage.jsx";
import SignUp from "../Pages/Doctor/SignUp.jsx";
import UpdateProfileDoc from "../Pages/Doctor/UpdateProfileDoc.jsx";
import UpdateProfileDoc2 from "../Pages/Doctor/UpdateProfileDoc2.jsx";
import UpdateProfileDoc3 from "../Pages/Doctor/UpdateProfileDoc3.jsx";
import UpdateProfileDoc4 from "../Pages/Doctor/UpdateProfileDoc4.jsx";
import ForgotPassword from "../Pages/Doctor/ForgotPassword.jsx";
import Support from "../Pages/Doctor/Support.jsx";
import ProtectedRoute from "../Utilities/Doctor/ProtectedRoute.jsx";
import Dashboard from "../Pages/Doctor/Dashboard.jsx";
import PatientProfile from "../Pages/Doctor/PatientProfile.jsx";
import Diagnose from "../Pages/Doctor/Diagnose.jsx";

const token = localStorage.getItem("DoctorToken");
const account = JSON.parse(localStorage.getItem("DoctorAccount"));
const isDoctorApproved = account?.approval_status || false;

const DoctorRoutes = () => (
  <DataProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/support" element={<Support />} />
      <Route path="/updateProfileDoc" element={<UpdateProfileDoc />} />
      <Route path="/updateProfileDoc2" element={<UpdateProfileDoc2 />} />
      <Route path="/updateProfileDoc3" element={<UpdateProfileDoc3 />} />
      <Route path="/updateProfileDoc4" element={<UpdateProfileDoc4 />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient/:id" element={<PatientProfile />} />
        <Route path="/diagnose/:id" element={<Diagnose />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </DataProvider>
);

export default DoctorRoutes;
