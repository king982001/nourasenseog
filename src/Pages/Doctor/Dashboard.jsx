import React, { useEffect } from "react";
import Introduction from "src/Components/Doctor/Introduction.jsx";
import PatientList from "src/Components/Doctor/PatientList.jsx";
import CalendarComp from "src/Components/Doctor/CalenderComp.jsx";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Nourasense - Dashboard";
  }, []);

  return (
    <div className="dashboard-container min-h-[80vh]">
      <Introduction />
      <PatientList />
      <CalendarComp />
    </div>
  );
};
export default Dashboard;
