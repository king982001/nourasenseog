import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";

const SomethingWentWrong = () => {
  useEffect(() => {
    document.title = "Nourasense - Error";
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-red-50 rounded-full text-red-500">
            <FiAlertTriangle className="h-12 w-12" />
          </div>
        </motion.div>
        
        <h1 className="text-2xl font-light text-gray-800 mb-4">Something Went Wrong</h1>
        
        <p className="text-gray-600 mb-2">
          We're sorry, but an unexpected error occurred while processing your request.
        </p>
        
        <p className="text-sm text-gray-500 mb-8">
          This could be due to a temporary issue. Please try refreshing the page or return to the dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors"
          >
            <FiRefreshCw className="h-4 w-4" />
            <span>Refresh Page</span>
          </motion.button>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 bg-primary-blue hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <FiHome className="h-4 w-4" />
              <span>Go to Dashboard</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SomethingWentWrong;
