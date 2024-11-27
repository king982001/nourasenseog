import DiagnoseIntro from "src/Components/Doctor/DiagnoseIntro";
import Footer from "src/Components/Doctor/Footer";
import CalenderTableComp from "src/Components/Doctor/CalenderTableComp";
import { useEffect } from "react";

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
      <Footer />
    </div>
  );
};

export default PatientProfile;
