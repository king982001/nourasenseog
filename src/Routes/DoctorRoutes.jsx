import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { FiHome, FiHelpCircle, FiLogOut, FiUserPlus } from "react-icons/fi";
import { motion } from "motion/react";
import { FaUsers } from "react-icons/fa6";

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

// Profile Modal Component
const ProfileModal = ({ isOpen, onClose, account }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-light text-gray-800">Profile Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex flex-col items-center mb-6">
            {account.registration?.selfie_image ? (
              <img 
                src={account.registration.selfie_image} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                {account.name?.charAt(0) || "D"}
              </div>
            )}
            <h3 className="text-xl font-light mt-4">Dr. {account.name} {account.surname}</h3>
            <p className="text-gray-500 text-sm">{account.email}</p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Phone" value={account.phonenumber} />
              <InfoItem label="Gender" value={account.gender} />
              <InfoItem label="Date of Birth" value={account.date_of_birth} />
              <InfoItem label="Address" value={account.address} />
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-lg font-light mb-4">Registration Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Establishment" value={account.registration?.establishment_name} />
                <InfoItem label="Registration Number" value={account.registration?.registration_number} />
                <InfoItem label="Registration Council" value={account.registration?.registration_council} />
                <InfoItem label="Place of Establishment" value={account.registration?.place_of_establishment} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Helper Component for Profile Info
const InfoItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-light">{value || "Not provided"}</p>
    </div>
  );
};

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
  const [profileModalOpen, setProfileModalOpen] = useState(false);
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
      {/* Profile Modal */}
      <ProfileModal 
        isOpen={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)}
        account={account}
      />
      
      {/* Top Navigation - Fixed */}
      <div className="fixed top-0 left-0 right-0 py-3 px-4 flex justify-between items-center border-b border-gray-100 bg-white shadow-sm z-10">
        <div className="flex items-center space-x-2">
          <img src="/Logo1.png" alt="Nourasense" className="h-8 w-auto" />
          <span className="text-primary-blue font-medium text-lg">Nourasense</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setProfileModalOpen(true)} 
            className="text-gray-600 hover:text-primary-blue flex items-center"
          >
            <span className="hidden md:inline mr-2 text-sm">
              {account.name ? `Dr. ${account.name} ${account.surname || ''}` : "Profile"}
            </span>
            {account.registration?.selfie_image ? (
              <img 
                src={account.registration.selfie_image} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                {account.name ? account.name.charAt(0) : "D"}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Content container - Add top padding to account for fixed header */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar - Fixed */}
        <div 
          className={`fixed top-16 left-0 h-[calc(100vh-64px)] border-r border-gray-100 bg-white transition-all duration-300 z-10 hidden md:flex flex-col ${
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
              to="/doctor/manage-subscription" 
              active={location.pathname.includes("/manage-subscription")} 
              collapsed={sidebarCollapsed}
              icon={<FaUsers className="h-5 w-5" />}
              text="Subscription"
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
        
        {/* Mobile Navigation - Fixed at bottom */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center p-3 z-50">
          <Link to="/doctor/" className={`p-2 rounded-lg ${location.pathname === "/doctor/" ? "text-primary-blue" : "text-gray-600"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          <Link to="/doctor/manage-subscription" className={`p-2 rounded-lg ${location.pathname.includes("/manage-subscription") ? "text-primary-blue" : "text-gray-600"}`}>
            <FaUsers className="h-6 w-6" />
          </Link>
          <button 
            onClick={() => setProfileModalOpen(true)} 
            className={`p-2 rounded-lg text-gray-600`}
          >
            {account.registration?.selfie_image ? (
              <img 
                src={account.registration.selfie_image} 
                alt="Profile" 
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-sm">
                {account.name ? account.name.charAt(0) : "D"}
              </span>
            )}
          </button>
        </div>
        
        {/* Main Content Area - With left padding for sidebar and scrollable */}
        <div className={`flex-1 overflow-auto pb-16 md:pb-0 ${!sidebarCollapsed ? 'md:ml-56' : 'md:ml-16'}`}>
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
