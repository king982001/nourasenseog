import DiagnoseIntro from "src/Components/Doctor/DiagnoseIntro.jsx";
import Footer from "src/Components/Footer.jsx";
import CalenderTableComp from "src/Components/Doctor/CalenderTableComp.jsx";
import React, { useEffect } from "react";
import BackButton from "src/Components/BackButton.jsx";

const PatientProfile = () => {
  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  return (
    <div className="diagnose-dashboard min-h-[80vh]">
      <BackButton display={"flex"} />
      <div className="diagnose-content">
        <DiagnoseIntro />
        <CalenderTableComp />
      </div>
    </div>
  );
};

export default PatientProfile;
