import DiagnoseIntro from "src/Components/Doctor/DiagnoseIntro.jsx";
import CalenderTableComp from "src/Components/Doctor/CalenderTableComp.jsx";
import React, { useEffect } from "react";
import BackButton from "src/Components/BackButton.jsx";
import { NutritionalValues } from "src/Components/Doctor/NutritionalValues.jsx";
import { GrowthCharts } from "src/Pages/Doctor/GrowthCharts.jsx";
import { DietPlan } from "src/Components/Doctor/DietPlan.jsx";
import MidParentHeight from "src/Components/Doctor/MidParentHeight.jsx";
import { Link, useParams } from "react-router-dom";

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

        {/* Calendar and Nutritional Values side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <CalenderTableComp />
          </div>
          <div className="lg:col-span-1">
            <Link to={`/doctor/patient/${patientId}/nutritional-values`} className="block">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nutritional Values</h3>
                <p className="text-gray-600">View detailed nutritional analysis</p>
              </div>
            </Link>
            <div className="mt-4">
            <Link to={`/doctor/patient/${patientId}/diet-plan`} className="block">
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Diet Plan</h3>
            <p className="text-gray-600">View and manage patient's diet plan</p>
          </div>
        </Link>
        </div>
          </div>
          
        </div>

        {/* Diet Plan */}
        
      </div>
    </div>
  );
};

export default PatientProfile;
