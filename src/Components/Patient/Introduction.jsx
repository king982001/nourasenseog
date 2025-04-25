import React from "react";
import { motion } from "motion/react";

const Introduction = () => {
  const account = JSON.parse(localStorage.getItem("account")) || {};
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl p-6 mb-6 shadow-sm"
    >
      <div className="flex items-center space-x-4">
        {account.profile_picture ? (
          <img 
            src={account.profile_picture} 
            alt="Profile" 
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-primary-blue text-xl font-light border border-blue-100">
            {account.name ? account.name.charAt(0).toUpperCase() : "P"}
          </div>
        )}
        
        <div>
          <h2 className="text-lg font-light text-gray-700">
            Welcome back, <span className="text-primary-blue font-normal">{account.name} {account.surname}</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Here's an overview of your children's health information
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600">Children</h3>
          <p className="text-2xl font-light text-primary-blue mt-1">
            {account.children_count || 0}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600">Recent Diagnoses</h3>
          <p className="text-2xl font-light text-green-600 mt-1">
            {account.recent_diagnoses || 0}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600">Last Activity</h3>
          <p className="text-sm text-purple-600 mt-1">
            {account.last_activity_date || "No recent activity"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Introduction;
