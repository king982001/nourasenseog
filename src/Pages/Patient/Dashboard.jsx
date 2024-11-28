import React from "react";
import Footer from "src/Components/Footer.jsx";
import Introduction from "src/Components/Patient/Introduction.jsx";
import PatientList from "src/Components/Patient/PatientList.jsx";

const ParentMainDashboard = () => {
  return (
    <div>
      <Introduction />
      <PatientList />
      <Footer />
    </div>
  );
};

export default ParentMainDashboard;
