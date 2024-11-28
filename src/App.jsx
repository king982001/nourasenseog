import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import DoctorRoutes from "src/Routes/DoctorRoutes.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import AdminRoutes from "src/Routes/AdminRoutes.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";
import LandingPage from "src/Pages/LandingPage.jsx";
import PatientRoutes from "src/Routes/PatientRoutes.jsx";
import Support from "src/Pages/Support.jsx";
function App() {
  const location = useLocation();
  const shouldShowEmptyHead = location.pathname !== "/";

  return (
    <>
      {shouldShowEmptyHead && <EmptyHead />}
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/support" element={<Support />} />
        <Route path="/*" element={<PatientRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
