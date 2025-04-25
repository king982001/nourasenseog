import React, { useEffect } from "react";
import Introduction from "src/Components/Patient/Introduction.jsx";
import PatientList from "src/Components/Patient/PatientList.jsx";

const ParentMainDashboard = () => {
  useEffect(() => {
    document.title = "Nourasense - Dashboard";
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-light text-gray-800 mb-4">Dashboard</h1>
      <Introduction />
      <PatientList />
    </div>
  );
};

export default ParentMainDashboard;
