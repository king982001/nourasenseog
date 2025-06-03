import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaTimes, FiActivity, FiMaximize, FiFileText } from 'react-icons/fa';
import { useDiagnose } from 'src/Hooks/DoctorHooks.js';
import toast from 'react-hot-toast';

const AnthropometricModal = ({ isOpen, onClose, patient }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [error, setError] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const { mutate: diagnose } = useDiagnose();

  const handleDiagnose = async () => {
    if (!patient) return toast.error("Oops! An error occurred.");

    // Validate input ranges
    if (weight && (weight < 1 || weight > 125)) {
      return toast.error("Weight must be between 1 and 125 kg.");
    }
    if (height && (height < 10 || height > 200)) {
      return toast.error("Height must be between 10 and 200 cm.");
    }
    if (headCircumference && (headCircumference < 10 || headCircumference > 150)) {
      return toast.error("Head circumference must be between 10 and 150 cm.");
    }

    if (!weight && !height && !headCircumference) {
      toast.error("Please enter at least one measurement to proceed.");
      return;
    }

    const toastId = toast.loading("Processing diagnosis...");
    setError(null);
    
    const account = JSON.parse(localStorage.getItem("DoctorAccount"));
    const dobFormatted = new Date(patient?.date_of_birth).toLocaleDateString("en-GB");
    
    const data = {
      dob: dobFormatted,
      gender: patient.gender.charAt(0).toLowerCase(),
      height: parseFloat(height),
      child_id: patient?.customId,
      user_id: account?.customId,
      weight: parseFloat(weight),
      head_circumference: parseFloat(headCircumference),
    };

    await diagnose(data, {
      onMutate: () => {
        setDiagnosisLoading(true);
      },
      onSuccess: (response) => {
        toast.success("Diagnosis completed successfully!", { id: toastId });
        setDiagnosisLoading(false);
        onClose();
      },
      onError: (error) => {
        console.log(error);
        setError("An error occurred during diagnosis");
        toast.error("Diagnosis failed. Please try again.", { id: toastId });
        setDiagnosisLoading(false);
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-light text-gray-800">Anthropometric Measurements</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Form */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Weight */}
                  <div className="space-y-2">
                    <label className="block text-sm font-light text-gray-600">
                      Weight (kg)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <FiActivity className="h-5 w-5" />
                      </div>
                      <input
                        type="number"
                        value={weight}
                        placeholder="Enter weight in kilograms"
                        className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 p-3"
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Height */}
                  <div className="space-y-2">
                    <label className="block text-sm font-light text-gray-600">
                      Height (cm)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <FiActivity className="h-5 w-5" />
                      </div>
                      <input
                        type="number"
                        value={height}
                        placeholder="Enter height in centimeters"
                        className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 p-3"
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Head Circumference */}
                  <div className="space-y-2">
                    <label className="block text-sm font-light text-gray-600">
                      Head Circumference (cm)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <FiMaximize className="h-5 w-5" />
                      </div>
                      <input
                        type="number"
                        value={headCircumference}
                        placeholder="Enter head circumference in centimeters"
                        className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 p-3"
                        onChange={(e) => setHeadCircumference(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="w-full py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    onClick={handleDiagnose}
                    disabled={diagnosisLoading}
                  >
                    {diagnosisLoading ? (
                      <div className="flex justify-center items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <FiFileText className="h-5 w-5" />
                        <span>Generate Diagnosis</span>
                      </div>
                    )}
                  </button>
                  
                  {error && (
                    <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnthropometricModal; 