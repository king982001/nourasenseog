import React, { useEffect, useState } from "react";
import Introduction from "src/Components/Doctor/Introduction.jsx";
import PatientList from "src/Components/Doctor/PatientList.jsx";
import CalendarComp from "src/Components/Doctor/CalenderComp.jsx";
import { motion } from "motion/react";

// Custom styles for consistent font usage
const globalStyles = `
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');
  
  /* Custom styles */
  body {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 300;
  }
`;

// Stats Card Component
const StatCard = ({ title, value, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex items-center"
    >
      <div className="p-2 rounded-full mr-3 bg-gray-50">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-xs font-light">{title}</p>
        <h3 className="text-lg font-light mt-0.5">{value}</h3>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const account = JSON.parse(localStorage.getItem("DoctorAccount")) || {};
  
  useEffect(() => {
    document.title = "Nourasense - Doctor Dashboard";
    
    // Add Inter font
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    // Simulate loading of dashboard data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // Mock stats data - in a real app, this would come from an API
  const stats = {
    totalPatients: 24,
    appointmentsToday: 3,
    pendingReports: 7,
    completedDiagnoses: 42
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-gray-700 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-light">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 bg-gray-50">
      {/* Introduction Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <Introduction />
      </motion.div>
      
      {/* Main Dashboard Content with Stats and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Patient List and Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-5"
        >
          {/* Stats Cards in row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard 
              title="Total Patients" 
              value={stats.totalPatients} 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <StatCard 
              title="Today's Appointments" 
              value={stats.appointmentsToday} 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
            <StatCard 
              title="Pending Reports" 
              value={stats.pendingReports} 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <StatCard 
              title="Completed Diagnoses" 
              value={stats.completedDiagnoses} 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
          
          {/* Patient List */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-light text-gray-800">Your Patients</h2>
              <p className="text-sm text-gray-500 mt-1">Manage and monitor your patients</p>
            </div>
            <div className="p-4">
              <PatientList />
            </div>
          </div>
        </motion.div>
        
        {/* Right Column: Calendar - Now visible higher up in the layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CalendarComp />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
