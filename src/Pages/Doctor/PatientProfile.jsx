import DiagnoseIntro from "src/Components/Doctor/DiagnoseIntro.jsx";
import CalenderTableComp from "src/Components/Doctor/CalenderTableComp.jsx";
import React, { useEffect } from "react";
import BackButton from "src/Components/BackButton.jsx";
import { NutritionalValues } from "src/Components/Doctor/NutritionalValues.jsx";
import { GrowthCharts } from "src/Pages/Doctor/GrowthCharts.jsx";
import { DietPlan } from "src/Components/Doctor/DietPlan.jsx";
import MidParentHeight from "src/Components/Doctor/MidParentHeight.jsx";
import { Link, useParams } from "react-router-dom";
import DiagnosisTable from "src/Components/Doctor/DiagnosisTable.jsx"; // <-- Add this import

const PatientProfile = () => {
  const { id: patientId } = useParams();

  useEffect(() => {
    document.title = "Nourasense - Patient Profile";
  }, []);

  return (
    <div className="container mx-auto px-4 py-5 bg-gray-50 min-h-screen">
      <div className="space-y-5">
        {/* Top section with patient info and mid-parent height card side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <DiagnoseIntro />
          </div>
          <div className="lg:col-span-1">
            <MidParentHeight />
          </div>
        </div>

        {/* Growth Charts */}
        <GrowthCharts />

        {/* Diagnosis Table */}
        <DiagnosisTable customId={patientId} />

        {/* Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <CalenderTableComp />
          </div>
        </div>

        {/* Nutritional Values on their own */}
        <NutritionalValues patientId={patientId} />

        {/* Diet Plan at the end of the page */}
        <DietPlan patientId={patientId} />
      </div>
    </div>
  );
};

export default PatientProfile;
