import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("AdminToken");
  return token ? <Outlet /> : <Navigate to={"/admin/login"} />;
};

export default ProtectedRoute;
