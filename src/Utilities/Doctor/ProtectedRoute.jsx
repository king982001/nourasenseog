import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("DoctorToken");
  const account = localStorage.getItem("DoctorAccount");

  if (!token || !account) {
    return <Navigate to="/doctor/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
