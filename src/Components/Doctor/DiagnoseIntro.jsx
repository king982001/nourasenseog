import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePatientById } from "src/Hooks/DoctorHooks.js";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const DiagnoseIntro = () => {
  const { id } = useParams();
  const { data: patient, isLoading: loading, isError } = usePatientById(id);
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("DoctorAccount"));
  const isDoctorApproved = account?.verified || false;
  const doctorName = account?.name?.trim() || "";
  const surName = account?.surname?.trim() || "";
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [showDiagnoseModal, setShowDiagnoseModal] = useState(false);
  const diagnoseRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showDiagnoseModal) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (diagnoseRef.current && !diagnoseRef.current.contains(e.target)) {
        setShowDiagnoseModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full py-12">
        <div className="text-center">
          <ClipLoader size={40} color="#9ca3af" />
          <p className="mt-4 text-gray-500 font-light">Loading patient data...</p>
        </div>
      </div>
    );
  }
  
  if (!patient) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500 font-light">Patient information not found</p>
      </div>
    );
  }

  const navigateToDiagnosos = (id) => {
    if (!isDoctorApproved)
      return toast.error(
        "You're not approved yet. so you cannot access this feature.",
      );
    navigate(`/doctor/diagnose/${id}`, { state: { isApproved: true } });
  };

  // Format date of birth if available
  const formatDOB = (dateString) => {
    if (!dateString) return 'N/A';
    const [year, month, day] = dateString.split('/');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1">
            <h2 className="text-xl font-light text-gray-800 mb-1">
              Patient Profile
            </h2>
            <p className="text-base text-gray-600 font-light">
              {patient.name} {patient.surname}
            </p>
            <p className="text-sm text-gray-500 font-light mt-1">
              ID: {patient.customId || 'N/A'}
            </p>
            {patient.gender && (
              <p className="text-sm text-gray-500 font-light mt-1">
                Gender: {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
              </p>
            )}
            {patient.date_of_birth && (
              <p className="text-sm text-gray-500 font-light mt-1">
                Date of Birth: {formatDOB(patient.date_of_birth)}
              </p>
            )}
          </div>
          
          <div className="flex flex-col md:items-center">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 font-light">Today:</span>
                <span className="text-sm text-gray-700">{formattedDate}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateToDiagnosos(id)}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-light transition-colors"
            >
              Start Diagnosis
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnoseIntro;
