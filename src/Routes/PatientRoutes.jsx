import { Routes, Route } from "react-router-dom";
import Login from "src/Pages/Patient/Login.jsx";
import SignUp from "src/Pages/Patient/SignUp.jsx";
import Dashboard from "src/Pages/Patient/Dashboard.jsx";
import Diagnose from "src/Pages/Patient/Diagnose.jsx";
import PatientProfile from "src/Pages/Patient/PatientProfile.jsx";
import ProtectedRoute from "src/Utilities/Patient/ProtectedRoute.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import ForgotPassword from "src/Pages/Patient/ForgotPassword.jsx";
import GeneralDetails from "src/Pages/Patient/GeneralDetails.jsx";

const PatientRoutes = () => (
  <Routes>
    <Route path={"/login"} element={<Login />} />
    <Route path={"/signup"} element={<SignUp />} />
    <Route path={"/update-profile"} element={<GeneralDetails />} />
    <Route path={"/forgot-password"} element={<ForgotPassword />} />
    <Route element={<ProtectedRoute />}>
      <Route path={"/dashboard"} element={<Dashboard />} />
      <Route path={"/child/:id"} element={<PatientProfile />} />
      <Route path={"/child/diagnose/:id"} element={<Diagnose />} />
    </Route>
    <Route path={"*"} element={<NotFoundPage />} />
  </Routes>
);

export default PatientRoutes;
