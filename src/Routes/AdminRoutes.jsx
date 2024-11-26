import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Admin/Login.jsx";
import { Dashboard } from "../Pages/Admin/Dashboard.jsx";
import ProtectedRoute from "../Utilities/Admin/ProtectedRoute.jsx";
import { VerifyDoctor } from "../Pages/Admin/VerifyDoctor.jsx";
import NotFoundPage from "../Pages/NotFoundPage.jsx";

const AdminRoutes = () => (
  <Routes>
    <Route path={"/login"} element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/verify/:doctorID" element={<VerifyDoctor />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AdminRoutes;
