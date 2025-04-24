import DiagnoseIntro from "src/Components/Doctor/DiagnoseIntro.jsx";
import CalenderTableComp from "src/Components/Doctor/CalenderTableComp.jsx";
import React, { useEffect } from "react";
import BackButton from "src/Components/BackButton.jsx";
import { NutritionalValues } from "src/Components/Doctor/NutritionalValues.jsx";
import { GrowthCharts } from "src/Pages/Doctor/GrowthCharts.jsx";
import { DietPlan } from "src/Components/Doctor/DietPlan.jsx";
import MidParentHeight from "src/Components/Doctor/MidParentHeight.jsx";

const PatientProfile = () => {
  useEffect(() => {
    document.title = "Nourasense - Patient Profile";
  }, []);

  return (
    <div className="container mx-auto px-4 py-5 bg-gray-50 min-h-screen">

      
      <div className="space-y-6">
        <DiagnoseIntro />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MidParentHeight />
          <GrowthCharts />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CalenderTableComp />
          </div>
          <div className="lg:col-span-1">
            <NutritionalValues />
          </div>
        </div>
        
        <DietPlan />
      </div>
    </div>
  );
};

export default PatientProfile;
