import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiLogIn,
  FiUserPlus,
  FiHelpCircle,
  FiUsers,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

import RoleSelectionModal from "src/Components/RoleSelectionModal.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";

const phoneNumber = "+91 9723964754";
const emailAddress = "support@nourasense.com";
const instaLink = "https://www.Instagram.com/nourasense_co";
const linkedIn = "https://www.linkedin.com/company/nourasense";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("signup");

  useEffect(() => {
    document.title = "Nourasense";
  }, []);

  const openModal = (action) => {
    setAction(action);
    setIsModalOpen(true);
  };

  const handleRoleSelection = (role) => {
    if (action === "signup") {
      navigate(role === "doctor" ? "/doctor/signup" : "/signup");
    } else {
      navigate(role === "doctor" ? "/doctor/login" : "/login");
    }
  };

  const menuItems = [
    { name: "Doctor Login", link: "/doctor/login", icon: FiUsers },
    { name: "Doctor Sign Up", link: "/doctor/signup", icon: FiUser },
    { name: "Parent Login", link: "/login", icon: FiLogIn },
    { name: "Parent Sign Up", link: "/signup", icon: FiUserPlus },
    { name: "Pricing", link: "/pricing", icon: FiDollarSign },
    { name: "Support", link: "/support", icon: FiHelpCircle },
  ];

  return (
    <div className="bg-white min-h-screen">
      <EmptyHead showNavigation={true} menuItems={menuItems} />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary-blue leading-tight drop-shadow-[0_1px_2px_rgba(0,47,136,0.15)]"
          >
            Transform Child <span className="text-blue-600">Growth Monitoring</span> with NouraSense
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-700 max-w-2xl mx-auto"
          >
            Join the revolution in child healthcare. Our innovative platform empowers you to track, diagnose, and optimize child growth with precision and ease.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => openModal("signup")}
              className="bg-primary-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,47,136,0.25)]"
            >
              Create account <FaArrowRight />
            </button>
            <button
              onClick={() => openModal("login")}
              className="border-2 border-primary-blue text-primary-blue px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-[0_4px_14px_rgba(0,47,136,0.1)]"
            >
              Sign in
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Hero Image Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-5xl mx-auto">
          <img 
            src="/src/assets/Doctor/1.png" 
            alt="NouraSense Platform" 
            className="w-full rounded-2xl shadow-[0_8px_30px_rgba(0,47,136,0.15)]" 
          />
        </div>
      </motion.section>

      {/* Problems Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-primary-blue text-center mb-12 drop-shadow-[0_1px_2px_rgba(0,47,136,0.15)]">
            What are we solving?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl shadow-[0_4px_16px_rgba(0,47,136,0.08)] hover:shadow-[0_8px_24px_rgba(0,47,136,0.12)] transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-blue mb-2 text-center">Undetected Growth Issues</h3>
              <p className="text-gray-700 text-sm text-center">
                Millions of children face growth-related challenges that go unnoticed until they become severe.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl shadow-[0_4px_16px_rgba(0,47,136,0.08)] hover:shadow-[0_8px_24px_rgba(0,47,136,0.12)] transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-blue mb-2 text-center">Inconsistent Diagnostics</h3>
              <p className="text-gray-700 text-sm text-center">
                Traditional growth monitoring methods can be inconsistent and limited by access to healthcare.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl shadow-[0_4px_16px_rgba(0,47,136,0.08)] hover:shadow-[0_8px_24px_rgba(0,47,136,0.12)] transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-blue mb-2 text-center">Complexity of Data</h3>
              <p className="text-gray-700 text-sm text-center">
                Interpreting growth data requires specialized knowledge and can be overwhelming for parents and physicians.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl shadow-[0_4px_16px_rgba(0,47,136,0.08)] hover:shadow-[0_8px_24px_rgba(0,47,136,0.12)] transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-blue mb-2 text-center">Need for Actionable Reports</h3>
              <p className="text-gray-700 text-sm text-center">
                Without clear, personalized reports, important health issues may go unaddressed, affecting long-term well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-bold text-primary-blue drop-shadow-[0_1px_2px_rgba(0,47,136,0.15)]">Fast, Automatic Diagnoses</h2>
              <p className="text-gray-700">
                Get accurate health assessments in seconds. Our advanced algorithms analyze critical growth indicators to provide immediate diagnostic results, eliminating the need for lengthy manual calculations.
              </p>
              <button
                onClick={() => openModal("signup")}
                className="bg-primary-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-[0_4px_14px_rgba(0,47,136,0.25)]"
              >
                Get Started
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img src="/src/assets/Doctor/2.png" alt="Diagnoses" className="w-full rounded-2xl shadow-[0_8px_30px_rgba(0,47,136,0.15)]" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-16 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-primary-blue text-center mb-12 drop-shadow-[0_1px_2px_rgba(0,47,136,0.15)]">
            How it works
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl shadow-[0_4px_16px_rgba(0,47,136,0.08)] hover:shadow-[0_8px_24px_rgba(0,47,136,0.12)] transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-blue mb-2 text-center">1. Create Account</h3>
              <p className="text-gray-700 text-sm text-center">
                Start with a secure account. This simple, quick step allows access to personalized child growth diagnostics.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl shadow-[0_4px_16px_rgba(0,47,136,0.08)] hover:shadow-[0_8px_24px_rgba(0,47,136,0.12)] transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-blue mb-2 text-center">2. Diagnose</h3>
              <p className="text-gray-700 text-sm text-center">
                Enter your child's measurements. Our algorithms analyze these inputs against standardized growth charts.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl shadow-[0_4px_16px_rgba(0,47,136,0.08)] hover:shadow-[0_8px_24px_rgba(0,47,136,0.12)] transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-blue mb-2 text-center">3. Get Report</h3>
              <p className="text-gray-700 text-sm text-center">
                Receive a comprehensive report detailing your child's growth metrics and potential areas requiring attention.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white text-gray-700 py-12 border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,47,136,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="/Logo1.png" alt="Logo" className="h-8" />
                <span className="text-xl font-semibold text-primary-blue">NouraSense</span>
              </div>
              <p className="text-gray-600">
                Developing state-of-the-art diagnostics and reporting tools for better child care.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-blue">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/support" className="text-gray-600 hover:text-primary-blue transition-colors">Support</Link></li>
                <li><Link to="/support" className="text-gray-600 hover:text-primary-blue transition-colors">Feedback</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-600 hover:text-primary-blue transition-colors">Privacy Policy</Link></li>
                <li><Link to="/t&c" className="text-gray-600 hover:text-primary-blue transition-colors">Terms and Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-blue">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/signup" className="text-gray-600 hover:text-primary-blue transition-colors">Create account</Link></li>
                <li><Link to="/login" className="text-gray-600 hover:text-primary-blue transition-colors">Sign in</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-blue">Connect With Us</h4>
              <div className="flex gap-4">
                <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-primary-blue p-2 rounded-full hover:bg-blue-100 transition-colors">
                  <FaLinkedinIn size={20} />
                </a>
                <a href={instaLink} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-primary-blue p-2 rounded-full hover:bg-blue-100 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href={`mailto:${emailAddress}`} className="bg-blue-50 text-primary-blue p-2 rounded-full hover:bg-blue-100 transition-colors">
                  <FaEnvelope size={20} />
                </a>
                <a href={`tel:${phoneNumber}`} className="bg-blue-50 text-primary-blue p-2 rounded-full hover:bg-blue-100 transition-colors">
                  <FaPhone size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            © Copyright NouraSense 2024. All Rights Reserved.
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <RoleSelectionModal
          onClose={() => setIsModalOpen(false)}
          onSelectRole={handleRoleSelection}
        />
      )}
    </div>
  );
};

export default LandingPage;
