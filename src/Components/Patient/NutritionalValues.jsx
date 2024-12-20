import { useNutrition } from "src/Hooks/Hooks.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useChildrenById } from "src/Hooks/PatientHooks.js";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 bg-primary-blue ">{children}</div>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

const renderCategory = (title, data) => (
  <Card>
    <CardHeader>
      <h2 className="text-lg font-semibold text-white font-sans">{title}</h2>
    </CardHeader>
    <CardContent>
      <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-2">
          {Object.entries(data).map(([nutrient, value]) => (
            <div
              key={nutrient}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-sans text-slate-700 font-semibold">
                {nutrient}
              </span>
              <span className="text-sm font-sans text-slate-800 ml-4">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
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
    data: childrenData,
    isLoading: isChildrenLoading,
    isError: isChildrenError,
  } = useChildrenById(id);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (childrenData && childrenData.gender && childrenData.dataOfBirth) {
      const age = calculateAgeInMonths(childrenData.dataOfBirth);
      const childData = {
        child_age: age,
        child_gender: childrenData.gender.charAt(0).toLowerCase(),
      };
      mutate(childData, {
        onError: (error) => {
          console.error("Error fetching nutrition data:", error);
          setError(error.message || "An error occurred.");
          setIsMutating(false);
        },
        onSuccess: () => {
          setError(null); // Clear any existing errors on success.
          setIsMutating(false);
        },
      });
    }
  }, []);
  if (isChildrenLoading || isMutating)
    return (
      <div className={"w-full flex flex-col mt-12 justify-center items-center"}>
        <h1 className="font-serif text-xl font-semibold text-center">
          Nutritional Values
        </h1>
        <h1 className="  mt-4 text-primary-blue text-lg">
          <ClipLoader color={"#002f88"} />
        </h1>
      </div>
    );

  if (isChildrenError)
    return <p>Error fetching patient data. Please try again later.</p>;

  if (isMutationError) return <p>Error fetching nutrition data: {error}</p>;
  console.log({ isMutating, isChildrenLoading });
  if (!nutritionData && !isMutating && !isChildrenLoading)
    return (
      <p className="text-center text-lg">No nutritional data available.</p>
    );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 mt-12">
      <h1 className="font-serif text-xl font-semibold text-center">
        Nutritional Values
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderCategory("Vitamins", nutritionData.vitamins)}
        {renderCategory("Minerals", nutritionData.minerals)}
        {renderCategory("Macronutrients", nutritionData.macronutrients)}
      </div>
    </div>
  );
};
