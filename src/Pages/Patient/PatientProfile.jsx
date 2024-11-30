import Footer from "src/Components/Footer.jsx";
import { useEffect } from "react";
import DiagnoseIntro from "src/Components/Patient/DiagnoseIntro.jsx";
import CalenderTableComp from "src/Components/Patient/CalenderTableComp.jsx";

const PatientProfile = () => {
  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  return (
    <div className="diagnose-dashboard">
      <div className="diagnose-content">
        <DiagnoseIntro />
        <CalenderTableComp />
      </div>
    </div>
  );
};

export default PatientProfile;
