import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("DoctorToken");
  const account = localStorage.getItem("DoctorAccount");
  return token && account ? <Outlet /> : <Navigate to={"/doctor/login"} />;
};

export default ProtectedRoute;
