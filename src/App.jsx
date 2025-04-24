import "./App.css";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import DoctorRoutes from "src/Routes/DoctorRoutes.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import AdminRoutes from "src/Routes/AdminRoutes.jsx";
import LandingPage from "src/Pages/LandingPage.jsx";
import PatientRoutes from "src/Routes/PatientRoutes.jsx";
import Support from "src/Pages/Support.jsx";
import Footer from "./Components/LandingPage/Footer";
import TermsAndConditions from "src/Pages/TermsAndConditions.jsx";
import Policy from "src/Pages/Policy.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";
import Pricing from "src/Pages/Pricing.jsx";
import { NavbarDemo } from "./Components/LandingPage/Header";
function App() {
  const location = useLocation();
  const shouldShowFooter = location.pathname !== "/";

  const Layout = () => (
    <>
      <Outlet />
    </>
  );

  return (
    <>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<PatientRoutes />} />
        <Route element={<Layout />}>
          <Route path="/support" element={<Support />} />
          <Route path="/t&c" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
