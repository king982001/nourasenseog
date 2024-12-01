import React from "react";
import { Routes, Route } from "react-router-dom";
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
import ApprovedRoute from "src/Utilities/Doctor/ApprovedRoute.jsx";

const token = localStorage.getItem("DoctorToken");
const account = JSON.parse(localStorage.getItem("DoctorAccount"));
const isDoctorApproved = account?.approval_status || false;

const DoctorRoutes = () => (
  <DataProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/updateProfileDoc" element={<UpdateProfileDoc />} />
      <Route path="/updateProfileDoc2" element={<UpdateProfileDoc2 />} />
      <Route path="/updateProfileDoc3" element={<UpdateProfileDoc3 />} />
      <Route path="/updateProfileDoc4" element={<UpdateProfileDoc4 />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/diagnose/:id" element={<Diagnose />} />
        <Route path="/patient/:id" element={<PatientProfile />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </DataProvider>
);

export default DoctorRoutes;
