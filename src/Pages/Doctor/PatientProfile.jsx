import DiagnoseIntro from "src/Components/Doctor/DiagnoseIntro.jsx";
import CalenderTableComp from "src/Components/Doctor/CalenderTableComp.jsx";
import React, { useEffect } from "react";
import BackButton from "src/Components/BackButton.jsx";
import { NutritionalValues } from "src/Components/Doctor/NutritionalValues.jsx";
import { GrowthCharts } from "src/Pages/Doctor/GrowthCharts.jsx";

const PatientProfile = () => {
  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  return (
    <div className="diagnose-dashboard min-h-[80vh]">
      <BackButton display={"flex"} />
      <div className="diagnose-content">
        <DiagnoseIntro />
        <GrowthCharts />
        <CalenderTableComp />
        <NutritionalValues />
      </div>
    </div>
  );
};

export default PatientProfile;
