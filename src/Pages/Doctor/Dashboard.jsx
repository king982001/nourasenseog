import React, { useEffect } from "react";
import Introduction from "src/Components/Doctor/Introduction.jsx";
import PatientList from "src/Components/Doctor/PatientList.jsx";
import CalendarComp from "src/Components/Doctor/CalenderComp.jsx";
import Footer from "src/Components/Footer.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("DoctorToken");
    localStorage.removeItem("DoctorAccount");
    navigate("/doctor/");
  };

  useEffect(() => {
    document.title = "Nourasense - Dashboard";
  }, []);

  return (
    <div className="dashboard-container">
      <div className="flex justify-end my-3 md:my-5">
        <button
          className="logout-btn bg-white border border-red-600 font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-colors h-10 p-2 mx-6 md:h-10 md:px-4 md:py-2 md:mx-8 text-center rounded"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <Introduction />
      <PatientList />
      <CalendarComp />
      <Footer />
    </div>
  );
};
export default Dashboard;
