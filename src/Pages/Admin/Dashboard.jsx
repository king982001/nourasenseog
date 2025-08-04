import React, { useEffect, useState } from "react";
import {
  useGetStatistics,
  useUnverifiedDoctors,
} from "src/Hooks/AdminHooks.js";
import { FiSearch, FiUsers, FiFileText, FiUserCheck } from "react-icons/fi";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import formatDate from "src/Utilities/Admin/formatDate.js";

// Redesigned Statistic Card component with animation
const StatisticCard = ({ title, icon, value, description, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-[30%] bg-white rounded-xl shadow-sm p-5 border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-light text-gray-500">{title}</h3>
          <p className="text-3xl font-light mt-2">{value}</p>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{description}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      <p className="mt-4 text-gray-600 font-light">Loading dashboard data...</p>
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
      We encountered an issue while loading your dashboard data. Please try refreshing the page.
    </p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-6 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Refresh Page
    </button>
  </div>
);

export const Dashboard = () => {
  const {
    data: statistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = useGetStatistics();

  const {
    data,
    isLoading: isAllDoctorsLoading,
    isError: isAllDoctorsError,
  } = useUnverifiedDoctors();

  const doctors = data?.data;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Nourasense - Admin Dashboard";
  }, []);

  if (isStatisticsLoading || isAllDoctorsLoading) {
    return <LoadingSpinner />;
  }

  if (isStatisticsError || isAllDoctorsError) {
    return <ErrorState />;
  }

  const statisticsData = [
    {
      title: "Doctors",
      icon: <FiUserCheck className="h-6 w-6 text-blue-500" />,
      value: statistics.data.totalDoctors,
      description: "Total number of registered medical professionals",
      color: "bg-blue-50",
    },
    {
      title: "Patients",
      icon: <FiUsers className="h-6 w-6 text-green-500" />,
      value: statistics.data.totalPatients,
      description: "Total number of registered patients",
      color: "bg-green-50",
    },
    {
      title: "Diagnoses",
      icon: <FiFileText className="h-6 w-6 text-purple-500" />,
      value: statistics.data.totalReports,
      description: "Total number of patient diagnoses made",
      color: "bg-purple-50",
    },
  ];

  const filteredDoctors = doctors?.doctors?.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.customId?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto w-full"
    >
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 font-light">{formatDate(Date.now())}</p>
      </div>

      {/* Statistics Cards */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {statisticsData.map((stat, index) => (
          <StatisticCard
            key={index}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
            description={stat.description}
            color={stat.color}
          />
        ))}
      </div>

      {/* Doctor Verification Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-light text-gray-800 mb-4 md:mb-0">Doctors Pending Verification</h2>
          
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 p-2.5"
              placeholder="Search by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Doctors Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Doctor ID</th>
                <th scope="col" className="px-6 py-3">Establishment</th>
                <th scope="col" className="px-6 py-3">Registration Date</th>
                <th scope="col" className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors?.length > 0 ? (
                filteredDoctors.map((doctor, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {doctor.name} {doctor.surname}
                    </td>
                    <td className="px-6 py-4">{doctor.customId}</td>
                    <td className="px-6 py-4">
                      {doctor.registration?.establishment_name || "Not specified"}
                    </td>
                    <td className="px-6 py-4">{formatDate(doctor.updatedAt)}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate(`/admin/verify/${doctor._id}`)}
                        className="py-2 px-4 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    {searchQuery ? "No doctors found matching your search criteria." : "No doctors pending verification at this time."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
