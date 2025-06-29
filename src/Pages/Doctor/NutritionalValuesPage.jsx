import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NutritionalValues } from "src/Components/Doctor/NutritionalValues.jsx";
import BackButton from "src/Components/BackButton.jsx";

const NutritionalValuesPage = () => {
  const { patientId } = useParams();

  useEffect(() => {
    document.title = "Nourasense - Nutritional Values";
  }, []);

  return (
    <div className="container mx-auto px-4 py-5 bg-gray-50 min-h-screen">
      <div className="pl-4">
        <BackButton />
      </div>
      <div className="mt-24">
        <NutritionalValues patientId={patientId} />
      </div>
    </div>
  );
};

export default NutritionalValuesPage; 