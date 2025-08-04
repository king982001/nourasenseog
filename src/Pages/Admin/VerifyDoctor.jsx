import { useNavigate, useParams } from "react-router-dom";
import {
  useDoctorById,
  useRejectDoctor,
  useVerifyDoctor,
} from "src/Hooks/AdminHooks.js";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import Prompt from "src/Components/Prompt.jsx";
import formatDate from "src/Utilities/Admin/formatDate.js";
import { FiCheckCircle, FiXCircle, FiArrowLeft } from "react-icons/fi";

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      <p className="mt-4 text-gray-600 font-light">Loading doctor information...</p>
    </div>
  </div>
);

// Error state component
const ErrorState = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-red-500 mb-4">
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h2 className="text-2xl font-light mb-2">Something Went Wrong</h2>
    <p className="text-gray-600 max-w-md text-center">
      We couldn't load the doctor information. Please try again.
    </p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-6 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Refresh Page
    </button>
  </div>
);

export const VerifyDoctor = () => {
  const { doctorID } = useParams();
  const { data, isLoading, isError } = useDoctorById(doctorID);
  const mutation = useVerifyDoctor();
  const doctor = data?.data?.doctor;
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [doctorToVerify, setDoctorToVerify] = useState(null);
  const { mutate: rejectDoctor } = useRejectDoctor();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Nourasense - Verify Doctor`;
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !doctor) {
    return <ErrorState />;
  }

  const handleVerify = (doctorId) => {
    setDoctorToVerify(doctorId);
    setIsPromptOpen(true);
  };

  const onConfirmPrompt = () => {
    const id = toast.loading("Processing verification...");
    setIsPromptOpen(false);
    mutation.mutate(doctorToVerify, {
      onSuccess: (response) => {
        toast.success("Doctor verified successfully!", { id });
        navigate("/admin/");
      },
      onError: (error) => {
        toast.error("Verification failed. Please try again.", { id });
        console.log("Doctor verify error", error);
      },
    });
  };

  const handleReject = (doctorId) => {
    const toastId = toast.loading("Processing rejection...");
    rejectDoctor(doctorId, {
      onSuccess: () => {
        toast.success("Doctor rejected successfully", { id: toastId });
        navigate("/admin/");
      },
      onError: (error) => {
        toast.error("Rejection failed. Please try again.", { id: toastId });
      },
    });
  };

  const onCancelPrompt = () => {
    setIsPromptOpen(false);
    setDoctorToVerify(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto w-full p-6"
    >
      {/* Header with back button */}
      <div className="mb-6">
        <button 
          onClick={() => navigate("/admin/")}
          className="flex items-center text-gray-600 hover:text-primary-blue mb-4"
        >
          <FiArrowLeft className="mr-2" />
          <span>Back to dashboard</span>
        </button>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-gray-800 mb-2">
            Doctor Verification
          </h1>
          <p className="text-gray-500">
            Reviewing registration information for Dr. {doctor.name} {doctor.surname}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Submitted on: {formatDate(doctor.updatedAt)}
          </p>
        </div>
      </div>

      {/* Doctor details card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-800">Personal Information</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-medium">{doctor.name} {doctor.surname}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
              <p>{doctor.date_of_birth || "Not provided"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Establishment Name</p>
              <p>{doctor?.registration?.establishment_name || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Registration Council</p>
              <p>{doctor?.registration?.registration_council || "Not provided"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
            <div>
              <p className="text-sm text-gray-500 mb-1">Registration Year</p>
              <p>{doctor?.registration?.registration_year || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Registration Number</p>
              <p>{doctor?.registration?.registration_number || "Not provided"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ID Documents */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Government Issued ID</h3>
          </div>
          <div className="p-2">
            <div className="relative pt-[56.25%] bg-gray-100 rounded overflow-hidden">
              {doctor?.registration?.id_image ? (
                <img
                  src={doctor?.registration?.id_image}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  alt="Government ID"
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
                  No ID image provided
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium">Medical License / Profile Photo</h3>
          </div>
          <div className="p-2">
            <div className="relative pt-[56.25%] bg-gray-100 rounded overflow-hidden">
              {doctor?.registration?.selfie_image ? (
                <img
                  src={doctor?.registration?.selfie_image}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  alt="Medical License/Profile"
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
                  No license image provided
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
      >
        <button
          onClick={() => handleVerify(doctor._id)}
          className="flex items-center justify-center gap-2 bg-primary-blue hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition-colors"
        >
          <FiCheckCircle className="h-5 w-5" />
          <span>Verify Doctor</span>
        </button>
        <button
          onClick={() => handleReject(doctor._id)}
          className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-8 rounded-lg transition-colors"
        >
          <FiXCircle className="h-5 w-5" />
          <span>Reject Application</span>
        </button>
      </motion.div>

      {isPromptOpen && (
        <Prompt
          isOpen={isPromptOpen}
          message={"Are you sure you want to verify this doctor?"}
          title={"Verify Doctor"}
          onConfirm={onConfirmPrompt}
          onCancel={onCancelPrompt}
        />
      )}
    </motion.div>
  );
};
