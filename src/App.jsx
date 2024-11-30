import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import DoctorRoutes from "src/Routes/DoctorRoutes.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import AdminRoutes from "src/Routes/AdminRoutes.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";
import LandingPage from "src/Pages/LandingPage.jsx";
import PatientRoutes from "src/Routes/PatientRoutes.jsx";
import Support from "src/Pages/Support.jsx";
import Footer from "src/Components/Footer.jsx";
import TermsAndConditions from "src/Pages/TermsAndConditions.jsx";
import Policy from "src/Pages/Policy.jsx";

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
        <Route path="/*" element={<PatientRoutes />} />
        <Route path="/support" element={<Support />} />
        <Route path="/t&c" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {shouldShowEmptyHead && <Footer />}
    </>
  );
}

export default App;
