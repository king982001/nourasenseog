import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa";
import DiagnoseIntro from "src/Components/Patient/DiagnoseIntro.jsx";
import CalenderTableComp from "src/Components/Patient/CalenderTableComp.jsx";
import { NutritionalValues } from "src/Components/Patient/NutritionalValues.jsx";

const PatientProfile = () => {
  const { id } = useParams();
  
  useEffect(() => {
    document.title = "Nourasense - Child Profile";
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-primary-blue transition-colors"
        >
          <FaArrowLeft className="mr-2" size={14} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <DiagnoseIntro />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CalenderTableComp />
            </motion.div>
          </div>
          
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NutritionalValues />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientProfile;
