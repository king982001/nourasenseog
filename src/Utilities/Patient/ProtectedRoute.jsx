import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const account = localStorage.getItem("account");
  return token && account ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
