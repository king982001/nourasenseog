import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNutrition } from "src/Hooks/Hooks.js";
import { useChildrenById } from "src/Hooks/PatientHooks.js";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";
import { FaAppleAlt, FaExclamationTriangle, FaLeaf } from "react-icons/fa";

// Reusable card component with animation
const NutritionCard = ({ title, data, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-xl shadow-sm overflow-hidden h-full"
  >
    <div className={`px-5 py-4 ${color} flex items-center justify-between`}>
      <h2 className="text-lg font-light text-white">{title}</h2>
      <div className="bg-white/20 rounded-full p-2">
        {icon}
      </div>
    </div>
    <div className="p-4">
      <div className="h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {data && Object.entries(data).length > 0 ? (
          <div className="space-y-1">
            {Object.entries(data).map(([nutrient, value]) => (
              <div
                key={nutrient}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-50"
              >
                <span className="text-sm text-gray-700">
                  {nutrient}
                </span>
                <span className="text-sm font-medium text-gray-900 ml-4">
                  {value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FaExclamationTriangle className="text-gray-300 text-3xl mb-3" />
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

// Helper for age calculation
const calculateAgeInMonths = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  
  // Try both date formats
  const dob = new Date(dateOfBirth);
  const now = new Date();

  if (isNaN(dob.getTime())) {
    return null;
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
  const { mutate, isError: isMutationError, data: nutritionData } = useNutrition();
  const [isMutating, setIsMutating] = useState(true);
  const { data: childData, isLoading: isChildLoading, isError: isChildError } = useChildrenById(id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (childData) {
      // Handle both API formats for gender and date of birth
      const gender = childData.gender?.charAt(0)?.toLowerCase() || 'm';
      const dob = childData.dataOfBirth || childData.dateOfBirth;
      
      if (dob) {
        try {
          const age = calculateAgeInMonths(dob);
          
          if (age !== null) {
            const childParams = {
              child_age: age,
              child_gender: gender
            };
            
            mutate(childParams, {
              onError: (error) => {
                console.error("Error fetching nutrition data:", error);
                setError(error.message || "Failed to load nutritional information.");
                setIsMutating(false);
              },
              onSuccess: () => {
                setError(null);
                setIsMutating(false);
              },
            });
          } else {
            setError("Invalid date of birth format.");
            setIsMutating(false);
          }
        } catch (e) {
          setError("Error calculating child's age: " + e.message);
          setIsMutating(false);
        }
      } else {
        setError("Child's date of birth is missing.");
        setIsMutating(false);
      }
    }
  }, [childData, mutate]);

  if (isChildLoading || isMutating) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm p-8 h-full"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <ClipLoader size={40} color="#3b82f6" />
          <p className="mt-4 text-gray-600 font-light">Loading nutritional values...</p>
        </div>
      </motion.div>
    );
  }

  if (isChildError || isMutationError || error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm p-8 h-full"
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="rounded-full bg-red-50 p-4 mb-4">
            <FaExclamationTriangle className="text-red-500 text-2xl" />
          </div>
          <h3 className="text-lg font-light text-gray-800 mb-2">Unable to Load Data</h3>
          <p className="text-gray-600 mb-4">
            {error || "We couldn't load the nutritional information. Please try again later."}
          </p>
        </div>
      </motion.div>
    );
  }

  // Ensure nutrition data exists and has the expected structure
  const hasNutritionData = nutritionData && 
    (nutritionData.vitamins || nutritionData.minerals || nutritionData.macronutrients);

  if (!hasNutritionData) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm p-8 h-full"
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="rounded-full bg-yellow-50 p-4 mb-4">
            <FaExclamationTriangle className="text-yellow-500 text-2xl" />
          </div>
          <h3 className="text-lg font-light text-gray-800 mb-2">No Nutritional Data</h3>
          <p className="text-gray-600">
            Nutritional information isn't available for this child's age and gender.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden h-full"
    >
      <div className="bg-primary-blue/5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800 flex items-center">
          <FaAppleAlt className="mr-2 text-primary-blue" />
          Nutritional Values
        </h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          <NutritionCard
            title="Vitamins"
            data={nutritionData.vitamins}
            icon={<FaLeaf className="text-white" />}
            color="bg-green-600"
            delay={0.1}
          />
          
          <NutritionCard
            title="Minerals"
            data={nutritionData.minerals}
            icon={<FaLeaf className="text-white" />}
            color="bg-blue-600"
            delay={0.2}
          />
          
          <NutritionCard
            title="Macronutrients"
            data={nutritionData.macronutrients}
            icon={<FaLeaf className="text-white" />}
            color="bg-purple-600"
            delay={0.3}
          />
        </div>
      </div>
    </motion.div>
  );
};
