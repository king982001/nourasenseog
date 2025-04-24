import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { FiHome, FiHelpCircle, FiLogOut, FiUserPlus } from "react-icons/fi";
import { motion } from "motion/react";

import Login from "src/Pages/Doctor/Login.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";
import SignUp from "src/Pages/Doctor/SignUp.jsx";
import UploadDoctorId from "src/Pages/Doctor/UploadDoctorId.jsx";
import UploadProfilePic from "src/Pages/Doctor/UploadProfilePic.jsx";
import ForgotPassword from "src/Pages/Doctor/ForgotPassword.jsx";
import ProtectedRoute from "src/Utilities/Doctor/ProtectedRoute.jsx";
import Dashboard from "src/Pages/Doctor/Dashboard.jsx";
import PatientProfile from "src/Pages/Doctor/PatientProfile.jsx";
import Diagnose from "src/Pages/Doctor/Diagnose.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";
import { GeneralDetails } from "src/Pages/Doctor/GeneralDetails.jsx";
import { FaCreditCard, FaUsers } from "react-icons/fa6";
import ManageSubscription from "src/Pages/Doctor/ManageSubscription";

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

// Sidebar Navigation Item
const SidebarItem = ({ icon, text, to, active, collapsed, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} py-2 px-3 rounded-lg transition-colors ${
        active
          ? "bg-blue-50 text-primary-blue"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {!collapsed && <span className="font-light truncate">{text}</span>}
      {collapsed && <span className="sr-only">{text}</span>}
    </Link>
  );
};

const PublicLayout = () => {
  const menuItems = [
    {
      name: "Home",
      link: "/",
      icon: FiHome,
    },
    {
      name: "Create Account",
      link: "/doctor/signup",
      icon: FiUserPlus,
    },
    {
      name: "Support",
      link: "/support",
      icon: FiHelpCircle,
    },
  ];

  return (
    <>
      <Outlet />
    </>
  );
};

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const account = JSON.parse(localStorage.getItem("DoctorAccount")) || {};
  
  useEffect(() => {
    // Add Inter font
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("DoctorToken");
    localStorage.removeItem("DoctorAccount");
    navigate("/doctor/login", { replace: true }); // Navigate to login
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <div className="w-full py-3 px-4 flex justify-between items-center border-b border-gray-100 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <img src="/Logo1.png" alt="Nourasense" className="h-8 w-auto" />
          <span className="text-primary-blue font-medium text-lg">Nourasense</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/doctor/profile" className="text-gray-600 hover:text-primary-blue flex items-center">
            <span className="hidden md:inline mr-2 text-sm">
              {account.name ? `Dr. ${account.name} ${account.surname || ''}` : "Profile"}
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
              {account.name ? account.name.charAt(0) : "D"}
            </span>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`hidden md:flex flex-col h-[calc(100vh-57px)] border-r border-gray-100 bg-white transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-56'
          }`}
        >
          {/* Sidebar Toggle Button */}
          <button 
            onClick={toggleSidebar}
            className="self-end p-2 m-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            {sidebarCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
            <SidebarItem 
              to="/doctor/" 
              active={location.pathname === "/doctor/"} 
              collapsed={sidebarCollapsed}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
              text="Dashboard"
            />
            <SidebarItem 
              to="/doctor/patients" 
              active={location.pathname.includes("/patient")} 
              collapsed={sidebarCollapsed}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              text="Patients"
            />
            <SidebarItem 
              to="/doctor/appointments" 
              active={location.pathname.includes("/appointments")} 
              collapsed={sidebarCollapsed}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              text="Appointments"
            />
            <SidebarItem 
              to="/doctor/reports" 
              active={location.pathname.includes("/reports")} 
              collapsed={sidebarCollapsed}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              text="Reports"
            />
            <SidebarItem 
              to="/doctor/profile" 
              active={location.pathname.includes("/profile")} 
              collapsed={sidebarCollapsed}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              text="Profile"
            />
            {account.subscriptionId && (
              <SidebarItem 
                to="/doctor/manage-subscription" 
                active={location.pathname.includes("/manage-subscription")} 
                collapsed={sidebarCollapsed}
                icon={<FaUsers className="h-5 w-5" />}
                text="Subscription"
              />
            )}
            <SidebarItem 
              to="/doctor/settings" 
              active={location.pathname.includes("/settings")} 
              collapsed={sidebarCollapsed}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              text="Settings"
            />
          </div>
          
          <div className="p-2 mt-auto border-t border-gray-100">
            <SidebarItem 
              to="/" 
              active={false}
              collapsed={sidebarCollapsed}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              }
              text="Home"
            />
            <SidebarItem 
              to="#"
              onClick={handleLogout}
              active={false}
              collapsed={sidebarCollapsed}
              icon={<FiLogOut className="h-5 w-5" />}
              text="Logout"
            />
          </div>
        </div>
        
        {/* Mobile Navigation (only shown on small screens) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center p-3 z-50">
          <Link to="/doctor/" className={`p-2 rounded-lg ${location.pathname === "/doctor/" ? "text-primary-blue" : "text-gray-600"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          <Link to="/doctor/patients" className={`p-2 rounded-lg ${location.pathname.includes("/patient") ? "text-primary-blue" : "text-gray-600"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
          <Link to="/doctor/profile" className={`p-2 rounded-lg ${location.pathname.includes("/profile") ? "text-primary-blue" : "text-gray-600"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto pb-16 md:pb-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const DoctorRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/update-profile" element={<GeneralDetails />} />
      <Route path="/upload-id" element={<UploadDoctorId />} />
      <Route path="/upload-profile" element={<UploadProfilePic />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>

    <Route
      element={
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/patient/:id" element={<PatientProfile />} />
      <Route path="/diagnose/:id" element={<Diagnose />} />
      <Route path="/manage-subscription" element={<ManageSubscription />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default DoctorRoutes;
