import React, { useState, useEffect } from "react";
import { Outlet, Route, Routes, useNavigate, Link, useLocation } from "react-router-dom";
import { FiHome, FiHelpCircle, FiLogOut, FiUser, FiCheck } from "react-icons/fi";
import { motion } from "motion/react";
import { Login } from "src/Pages/Admin/Login.jsx";
import { Dashboard } from "src/Pages/Admin/Dashboard.jsx";
import ProtectedRoute from "src/Utilities/Admin/ProtectedRoute.jsx";
import { VerifyDoctor } from "src/Pages/Admin/VerifyDoctor.jsx";
import NotFoundPage from "src/Pages/NotFoundPage.jsx";

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
const ProfileModal = ({ isOpen, onClose }) => {
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
          <h2 className="text-xl font-light text-gray-800">Admin Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary-blue bg-opacity-10 flex items-center justify-center text-primary-blue text-2xl">
              <FiUser className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-light mt-4">Administrator</h3>
            <p className="text-gray-500 text-sm">admin@nourasense.com</p>
          </div>
          
          <div className="space-y-4">
            <div className="mt-2 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-4">You are logged in as an administrator with access to verify doctors and manage system operations.</p>
            </div>
          </div>
        </div>
      </motion.div>
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
  useEffect(() => {
    // Add Inter font
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return <Outlet />;
};

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  
  useEffect(() => {
    // Add Inter font
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("AdminToken");
    navigate("/admin/login", { replace: true });
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
      />
      
      {/* Top Navigation - Fixed */}
      <div className="fixed top-0 left-0 right-0 py-3 px-4 flex justify-between items-center border-b border-gray-100 bg-white shadow-sm z-10">
        <div className="flex items-center space-x-2">
          <img src="/Logo1.png" alt="Nourasense" className="h-8 w-auto" />
          <span className="text-primary-blue font-medium text-lg">Nourasense Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setProfileModalOpen(true)} 
            className="text-gray-600 hover:text-primary-blue flex items-center"
          >
            <span className="hidden md:inline mr-2 text-sm">Administrator</span>
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-primary-blue">
              <FiUser className="h-5 w-5" />
            </span>
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
              to="/admin/" 
              active={location.pathname === "/admin/"} 
              collapsed={sidebarCollapsed}
              icon={<FiHome className="h-5 w-5" />}
              text="Dashboard"
            />
           
          </div>
          
          <div className="p-2 mt-auto border-t border-gray-100">
            <SidebarItem 
              to="/" 
              active={false}
              collapsed={sidebarCollapsed}
              icon={<FiHelpCircle className="h-5 w-5" />}
              text="Support"
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
          <Link to="/admin/" className={`p-2 rounded-lg ${location.pathname === "/admin/" ? "text-primary-blue" : "text-gray-600"}`}>
            <FiHome className="h-6 w-6" />
          </Link>
         
          <button 
            onClick={() => setProfileModalOpen(true)} 
            className={`p-2 rounded-lg text-gray-600`}
          >
            <FiUser className="h-6 w-6" />
          </button>
          <button 
            onClick={handleLogout} 
            className={`p-2 rounded-lg text-gray-600`}
          >
            <FiLogOut className="h-6 w-6" />
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

const AdminRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path={"/login"} element={<Login />} />
    </Route>
    <Route
      element={
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/verify/:doctorID" element={<VerifyDoctor />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AdminRoutes;
