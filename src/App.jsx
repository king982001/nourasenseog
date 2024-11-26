import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import DoctorRoutes from "./Routes/DoctorRoutes.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import AdminRoutes from "./Routes/AdminRoutes.jsx";
import EmptyHead from "./Components/EmptyHead.jsx";
function App() {
  const location = useLocation();
  const shouldShowEmptyHead = location.pathname !== "/doctor/";

  return (
    <>
      {shouldShowEmptyHead && <EmptyHead />}
      <Routes>
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
