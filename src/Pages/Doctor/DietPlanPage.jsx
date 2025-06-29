import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DietPlan } from "src/Components/Doctor/DietPlan.jsx";
import BackButton from "src/Components/BackButton.jsx";

const DietPlanPage = () => {
  const { patientId } = useParams();

  useEffect(() => {
    document.title = "Nourasense - Diet Plan";
  }, []);

  return (
    <div className="container mx-auto px-4 py-5 bg-gray-50 min-h-screen">
      <BackButton />
      <div className="mt-24">
        <DietPlan patientId={patientId} />
      </div>
    </div>
  );
};

export default DietPlanPage; 