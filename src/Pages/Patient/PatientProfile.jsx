import { useEffect } from "react";
import DiagnoseIntro from "src/Components/Patient/DiagnoseIntro.jsx";
import CalenderTableComp from "src/Components/Patient/CalenderTableComp.jsx";
import BackButton from "src/Components/BackButton.jsx";
import { NutritionalValues } from "src/Components/Patient/NutritionalValues.jsx";

const PatientProfile = () => {
  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  return (
    <div className="diagnose-dashboard">
      <BackButton display={"flex"} />
      <div className="diagnose-content">
        <DiagnoseIntro />
        <CalenderTableComp />
        <NutritionalValues />
      </div>
    </div>
  );
};

export default PatientProfile;
