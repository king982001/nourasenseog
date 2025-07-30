import React, { useState, useEffect } from "react";
import {
  useCalculateMPH,
  useGetMPH,
  usePatientById,
} from "src/Hooks/DoctorHooks.js";
import { useParams } from "react-router-dom";

export const MidParentHeight = () => {
  const { id } = useParams();
  const { data: child, isLoading: isLoadingPatient } = usePatientById(id);
  const {
    data: mph,
    isLoading: isLoadingMPH,
    refetch,
  } = useGetMPH(child?.customId);
  const { mutate, isLoading: isCalculating } = useCalculateMPH();

  const [fatherHeight, setFatherHeight] = useState(mph?.father_height);
  const [motherHeight, setMotherHeight] = useState(mph?.mother_height);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({ father: "", mother: "" });

  useEffect(() => {
    if (mph) {
      setFatherHeight(mph.father_height);
      setMotherHeight(mph.mother_height);
    }
  }, [mph]);

  const validateHeights = () => {
    const newErrors = { father: "", mother: "" };
    let isValid = true;

    if (!fatherHeight) {
      newErrors.father = "Father's height is required";
      isValid = false;
    } else if (fatherHeight < 130 || fatherHeight > 230) {
      newErrors.father = "Height should be between 130-230 cm";
      isValid = false;
    }

    if (!motherHeight) {
      newErrors.mother = "Mother's height is required";
      isValid = false;
    } else if (motherHeight < 130 || motherHeight > 230) {
      newErrors.mother = "Height should be between 130-230 cm";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCalculate = () => {
    if (!validateHeights()) return;

    mutate(
      {
        mother_height: motherHeight,
        father_height: fatherHeight,
        child_gender: child?.gender.charAt(0).toLowerCase(),
        child_id: child?.customId,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
    setIsModalOpen(false);
  };

  const handleHeightChange = (setValue) => (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 0 && value <= 300)) {
      setValue(value === "" ? "" : Number(value));
    }
  };

  const isLoading = isLoadingPatient || isLoadingMPH;

  return (
    <div className={"flex justify-center my-8 "}>
      <div className="p-4 sm:p-6 font-sans w-full max-w-7xl">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 text-center">
            Mid-Parent Height
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
            </div>
          ) : (
            <div className="space-y-4 mt-6 lg:mt-12">
              <div className="flex flex-col p-4 sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className={""}>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Mid-Parent Height
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-primary-blue">
                    {mph?.mid_parent_height?.toFixed(1) || "---"} cm
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-primary-blue hover:bg-blue-900 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Edit Heights
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Father's Height</p>
                  <p className="text-lg sm:text-xl font-bold text-primary-blue">
                    {mph?.father_height?.toFixed(1) || "---"} cm
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Mother's Height</p>
                  <p className="text-lg sm:text-xl font-bold text-primary-blue">
                    {mph?.mother_height?.toFixed(1) || "---"} cm
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-serif text-primary-blue">
                  Update Parent Heights
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Father's Height (cm)
                  </label>
                  <input
                    type="number"
                    value={fatherHeight}
                    onChange={handleHeightChange(setFatherHeight)}
                    placeholder="Enter height in cm"
                    className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none"
                    min="130"
                    max="230"
                  />
                  {errors.father && (
                    <p className="text-red-500 text-sm mt-1">{errors.father}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Mother's Height (cm)
                  </label>
                  <input
                    type="number"
                    value={motherHeight}
                    onChange={handleHeightChange(setMotherHeight)}
                    placeholder="Enter height in cm"
                    className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none"
                    min="130"
                    max="230"
                  />
                  {errors.mother && (
                    <p className="text-red-500 text-sm mt-1">{errors.mother}</p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCalculate}
                      disabled={isCalculating}
                      className="flex-1 sm:flex-none bg-primary-blue hover:bg-blue-900 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isCalculating ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        "Calculate"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MidParentHeight;
