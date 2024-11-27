import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import DoctorRoutes from "src/Routes/DoctorRoutes.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import AdminRoutes from "src/Routes/AdminRoutes.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";
function App() {
  const location = useLocation();
  const shouldShowEmptyHead =
    location.pathname !== "/doctor" || location.pathname !== "/doctor/";

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
