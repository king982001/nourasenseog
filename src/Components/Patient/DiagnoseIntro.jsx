import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useChildrenById } from "src/Hooks/PatientHooks.js";
import { motion } from "motion/react";
import { FaCalendarAlt, FaStethoscope, FaChild } from "react-icons/fa";

const DiagnoseIntro = () => {
  const { id } = useParams();
  const { data: patientData, isLoading, isError } = useChildrenById(id);
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("account")) || {};
  
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Helper to get child's name regardless of API format
  const getChildName = () => {
    if (!patientData) return "this child";
    
    // Handle both API formats (name/surname and firstName/lastName)
    const firstName = patientData.firstName || patientData.name || "";
    const lastName = patientData.lastName || patientData.surname || "";
    
    return `${firstName} ${lastName}`.trim() || "this child";
  };

  // Helper to get parent's name
  const getParentName = () => {
    if (!account) return "Parent";
    
    return `${account.name || ""} ${account.surname || ""}`.trim() || "Parent";
  };

  const navigateToDiagnose = () => {
    navigate(`/child/diagnose/${id}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <ClipLoader size={40} color="#3b82f6" />
          <p className="mt-4 text-gray-600 font-light">Loading child profile...</p>
        </div>
      </div>
    );
  }

  if (isError || !patientData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="rounded-full bg-red-50 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
          <FaChild className="text-red-500 text-2xl" />
        </div>
        <h2 className="text-xl font-light text-gray-800 mb-2">Child Not Found</h2>
        <p className="text-gray-600 mb-4">
          The child profile you're looking for could not be found.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-primary-blue text-white rounded-lg"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="bg-primary-blue/5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800">Child Profile</h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              {patientData.gender ? (
                <div className={`rounded-full w-10 h-10 flex items-center justify-center mr-3 ${
                  patientData.gender.toLowerCase() === 'male' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'
                }`}>
                  <FaChild />
                </div>
              ) : null}
              <h1 className="text-2xl font-light">
                <span className="text-primary-blue font-medium">{getChildName()}</span>
              </h1>
            </div>
            <p className="text-gray-600">
              Welcome to {getChildName()}'s profile, {getParentName()}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <FaCalendarAlt className="text-primary-blue mr-2" />
              <span className="text-gray-700">{formattedDate}</span>
            </div>
            
            <button
              onClick={navigateToDiagnose}
              className="flex items-center bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaStethoscope className="mr-2" />
              Diagnose
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600">Child ID</h3>
            <p className="text-lg font-light text-primary-blue mt-1">
              {patientData.customId || "N/A"}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600">Gender</h3>
            <p className="text-lg font-light text-green-600 mt-1 capitalize">
              {patientData.gender?.toLowerCase() || "Not specified"}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600">Date of Birth</h3>
            <p className="text-lg font-light text-purple-600 mt-1">
              {patientData.dataOfBirth || patientData.dateOfBirth || "Not specified"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiagnoseIntro;
