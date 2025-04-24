import React, { useState, useEffect } from "react";
import {
  useCalculateMPH,
  useGetMPH,
  usePatientById,
} from "src/Hooks/DoctorHooks.js";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";

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
    <div className="bg-white rounded-xl shadow-sm h-full">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800">Mid-Parent Height</h2>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
            <span className="ml-3 text-gray-500 font-light">Loading...</span>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="text-sm text-gray-500 font-light mb-1">Mid-Parent Height</p>
                <p className="text-2xl font-light text-gray-800">
                  {mph?.mid_parent_height?.toFixed(1) || "---"} <span className="text-sm text-gray-500">cm</span>
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="mt-4 sm:mt-0 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-light transition-colors"
              >
                Edit Heights
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-light mb-1">Father's Height</p>
                <p className="text-xl font-light text-gray-800">
                  {mph?.father_height?.toFixed(1) || "---"} <span className="text-sm text-gray-500">cm</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-light mb-1">Mother's Height</p>
                <p className="text-xl font-light text-gray-800">
                  {mph?.mother_height?.toFixed(1) || "---"} <span className="text-sm text-gray-500">cm</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-md max-w-md w-full mx-auto overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-light text-gray-800">Update Parent Heights</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Father's Height (cm)</label>
                <input
                  type="number"
                  value={fatherHeight}
                  onChange={handleHeightChange(setFatherHeight)}
                  placeholder="Enter height in cm"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm font-light"
                  min="130"
                  max="230"
                />
                {errors.father && (
                  <p className="text-red-500 text-xs mt-1">{errors.father}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Mother's Height (cm)</label>
                <input
                  type="number"
                  value={motherHeight}
                  onChange={handleHeightChange(setMotherHeight)}
                  placeholder="Enter height in cm"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm font-light"
                  min="130"
                  max="230"
                />
                {errors.mother && (
                  <p className="text-red-500 text-xs mt-1">{errors.mother}</p>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg text-sm font-light transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCalculate}
                disabled={isCalculating}
                className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-light transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCalculating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : null}
                Calculate
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MidParentHeight;
