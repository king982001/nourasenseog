import { useNutrition } from "src/Hooks/Hooks.js";
import { useEffect, useState } from "react";
import { usePatientById } from "src/Hooks/DoctorHooks.js";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const NutrientCard = ({ title, data }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-5 border-b border-gray-100">
      <h2 className="text-xl font-light text-gray-800">{title}</h2>
    </div>
    <div className="p-4">
      <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-1">
          {Object.entries(data).map(([nutrient, value]) => (
            <div
              key={nutrient}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">
                {nutrient}
              </span>
              <span className="text-sm font-medium text-gray-800 ml-4">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const calculateAgeInMonths = (dateOfBirth) => {
  // Ensure dateOfBirth is a valid Date object
  const dob = new Date(dateOfBirth);
  const now = new Date();

  if (isNaN(dob.getTime())) {
    throw new Error("Invalid date of birth.");
  }

  const years = now.getFullYear() - dob.getFullYear();
  const months = now.getMonth() - dob.getMonth();
  const totalMonths = years * 12 + months;

  // Ensure no negative months if the current day is earlier in the month than the birth day
  const dayDifference = now.getDate() - dob.getDate();
  return totalMonths - (dayDifference < 0 ? 1 : 0);
};

export const NutritionalValues = () => {
  const { id } = useParams();
  const {
    mutate,
    isError: isMutationError,
    data: nutritionData,
  } = useNutrition();
  const [isMutating, setIsMutating] = useState(true);
  const {
    data: patientData,
    isLoading: isPatientLoading,
    isError: isPatientError,
  } = usePatientById(id);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (patientData && patientData.gender && patientData.date_of_birth) {
      const age = calculateAgeInMonths(patientData.date_of_birth);
      const childData = {
        child_age: age,
        child_gender: patientData.gender.charAt(0).toLowerCase(),
        user_id: patientData.customId,
      };

      mutate(childData, {
        onError: (error) => {
          console.error("Error fetching nutrition data:", error);
          setError("An error occurred.");
          setIsMutating(false);
        },
        onSuccess: () => {
          setError(null); // Clear any existing errors on success.
          setIsMutating(false);
        },
      });
    }
  }, [mutate, patientData]);

  if (isPatientLoading || isMutating)
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <ClipLoader size={40} color="#9ca3af" />
          <p className="mt-4 text-gray-500 font-light">Loading nutritional data...</p>
        </div>
      </div>
    );

  if (isPatientError)
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 w-full">
        <div className="text-center py-6">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Patient Data</h3>
          <p className="mt-1 text-sm text-gray-500">Please try again later or contact support if the issue persists.</p>
        </div>
      </div>
    );

  if (isMutationError)
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 w-full">
        <div className="text-center py-6">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Nutritional Data</h3>
          <p className="mt-1 text-sm text-gray-500">We couldn't retrieve the nutritional information for this patient.</p>
        </div>
      </div>
    );

  if (!nutritionData && !isMutating)
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 w-full">
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Data Available</h3>
          <p className="mt-1 text-sm text-gray-500">No nutritional data is available for this patient.</p>
        </div>
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800">Nutritional Values</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutritionData && (
            <>
              <NutrientCard title="Vitamins" data={nutritionData.vitamins} />
              <NutrientCard title="Minerals" data={nutritionData.minerals} />
              <NutrientCard title="Macronutrients" data={nutritionData.macronutrients} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
