import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiLogIn,
  FiUserPlus,
  FiHelpCircle,
  FiUsers,
  FiUser,
  FiDollarSign,
  FiBarChart2,
  FiTrendingUp,
  FiActivity,
  FiPieChart
} from "react-icons/fi";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const problemsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const howItWorksInView = useInView(howItWorksRef, { once: false, amount: 0.3 });
  const problemsInView = useInView(problemsRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    document.title = "NouraSense";
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const dataPoints = [
    { value: "98%", label: "Accuracy", icon: FiActivity },
    { value: "3.5x", label: "Faster Analysis", icon: FiTrendingUp },
    { value: "4M+", label: "Data Points", icon: FiBarChart2 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <EmptyHead showNavigation={true} menuItems={menuItems} />

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 overflow-hidden"
      >
        {/* Background elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 overflow-hidden z-0"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gray-200"></div>
          <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-gray-200"></div>
          
          {/* Data science decorative elements */}
          <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-10">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Data points and lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-blue-400" 
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.3
              }}
            ></div>
          ))}
        </motion.div>

        <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <img src="/Logo1.png" alt="NouraSense Logo" className="h-16 w-auto" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-800 leading-tight"
          >
            Transform Child Growth Monitoring with <span className="text-blue-500">Data Science</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Our AI-powered platform helps you track, diagnose, and optimize child growth with precision and ease. Backed by advanced analytics and machine learning.
          </motion.p>
          
          {/* Data metrics */}
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6 my-10"
          >
            {dataPoints.map((point, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white rounded-lg shadow-lg p-4 px-6 flex items-center space-x-3"
              >
                <point.icon className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{point.value}</p>
                  <p className="text-sm text-gray-500">{point.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => openModal("signup")}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-lg"
            >
              Create account <FaArrowRight />
            </button>
            <button
              onClick={() => openModal("login")}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-blue-500 hover:text-blue-500 transition-all transform hover:-translate-y-1"
            >
              Sign in
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Data Visualization Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-gray-800">Advanced Growth Analytics</h2>
                  <p className="text-gray-600 mt-2">
                    Our platform uses sophisticated data science to transform raw measurements into actionable health insights.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 rounded-lg p-4 border border-blue-100"
                >
                  <div className="flex items-start space-x-3">
                    <FiPieChart className="text-blue-500 h-6 w-6 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-800">Machine Learning Models</h3>
                      <p className="text-sm text-gray-600">Our algorithms analyze multiple growth parameters simultaneously for comprehensive assessment.</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 rounded-lg p-4 border border-blue-100"
                >
                  <div className="flex items-start space-x-3">
                    <FiBarChart2 className="text-blue-500 h-6 w-6 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-800">Dynamic Visualization</h3>
                      <p className="text-sm text-gray-600">Interactive growth charts and percentile tracking with clear, visual representations.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src="/src/assets/Doctor/1.png" 
                  alt="Data Analysis Platform" 
                  className="rounded-lg shadow-lg w-full" 
                />
                
                {/* Animated data elements */}
                <motion.div 
                  className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Z-score: +1.2
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-10 -left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1.5
                  }}
                >
                  Growth velocity: Normal
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Problems Section */}
      <motion.section 
        ref={problemsRef}
        initial="hidden"
        animate={problemsInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-serif font-bold text-gray-800 text-center mb-12"
          >
            What are we solving?
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              variants={fadeIn}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Undetected Growth Issues</h3>
              <p className="text-gray-600 text-sm text-center">
                Millions of children face growth-related challenges that go unnoticed until they become severe.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Inconsistent Diagnostics</h3>
              <p className="text-gray-600 text-sm text-center">
                Traditional growth monitoring methods can be inconsistent and limited by access to healthcare.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Complexity of Data</h3>
              <p className="text-gray-600 text-sm text-center">
                Interpreting growth data requires specialized knowledge and can be overwhelming for parents and physicians.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Need for Actionable Reports</h3>
              <p className="text-gray-600 text-sm text-center">
                Without clear, personalized reports, important health issues may go unaddressed, affecting long-term well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-blue-600 font-medium text-sm">AI-Powered Analysis</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-800">Fast, Automatic Diagnoses</h2>
              <p className="text-gray-600">
                Get accurate health assessments in seconds. Our advanced algorithms analyze critical growth indicators to provide immediate diagnostic results, eliminating the need for lengthy manual calculations.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Real-time percentile calculations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Growth velocity tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Personalized health insights</span>
                </div>
              </div>
              
              <button
                onClick={() => openModal("signup")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all transform hover:-translate-y-1 shadow-md"
              >
                Get Started
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src="/src/assets/Doctor/2.png" 
                  alt="Diagnoses" 
                  className="w-full rounded-2xl shadow-xl" 
                />
                
                {/* Interactive data overlay elements */}
                <motion.div
                  className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-xs"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 4px 6px rgba(0, 0, 0, 0.1)", 
                      "0 10px 15px rgba(0, 0, 0, 0.2)", 
                      "0 4px 6px rgba(0, 0, 0, 0.1)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiBarChart2 className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">AI Analysis Complete</p>
                    <p className="text-gray-500 text-xs">Growth prediction: Above average</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        ref={howItWorksRef}
        initial="hidden"
        animate={howItWorksInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-serif font-bold text-gray-800 text-center mb-12"
          >
            How it works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeIn}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-50 rounded-full opacity-70"></div>
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">1. Create Account</h3>
              <p className="text-gray-600 text-center">
                Start with a secure account in under 2 minutes. This simple, quick step allows access to personalized child growth diagnostics.
              </p>
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-400"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-50 rounded-full opacity-70"></div>
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">2. Diagnose</h3>
              <p className="text-gray-600 text-center">
                Enter your child's measurements. Our AI-powered algorithms analyze these inputs against standardized growth charts and vast datasets.
              </p>
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-400"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
              />
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-50 rounded-full opacity-70"></div>
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">3. Act & Track</h3>
              <p className="text-gray-600 text-center">
                Get clear, actionable insights and recommendations. Monitor your child's progress over time with longitudinal tracking.
              </p>
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-400"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.9 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Contact Section */}
      <motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="py-16 bg-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl font-serif font-bold text-gray-800">Get in Touch</h2>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Have questions about how NouraSense can help your practice or your child? Reach out to our team.
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-gray-50 p-8 rounded-xl shadow-md"
      >
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-colors"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-colors"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 px-4 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-blue-50 p-3 rounded-lg text-blue-400">
              <FaPhone size={20} />
            </div>
            <div>
              <h4 className="text-gray-800 font-medium">Phone</h4>
              <a href={`tel:${phoneNumber}`} className="text-blue-400 hover:text-blue-500 transition-colors">{phoneNumber}</a>
              <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9am-6pm IST</p>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-blue-50 p-3 rounded-lg text-blue-400">
              <FaEnvelope size={20} />
            </div>
            <div>
              <h4 className="text-gray-800 font-medium">Email</h4>
              <a href={`mailto:${emailAddress}`} className="text-blue-400 hover:text-blue-500 transition-colors">{emailAddress}</a>
              <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
            </div>
          </motion.div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <motion.a 
              href={linkedIn} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-blue-50 text-blue-400 p-3 rounded-lg hover:bg-blue-100 transition-colors shadow-sm"
            >
              <FaLinkedinIn size={24} />
            </motion.a>
            <motion.a 
              href={instaLink} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-blue-50 text-blue-400 p-3 rounded-lg hover:bg-blue-100 transition-colors shadow-sm"
            >
              <FaInstagram size={24} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.section>
{/* Footer */}
<motion.footer 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="bg-white text-gray-700 py-16 border-t border-gray-100"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-2"
        >
          <img src="/Logo1.png" alt="Logo" className="h-8" />
          <span className="text-xl font-semibold text-gray-800">NouraSense</span>
        </motion.div>
        <p className="text-gray-600">
          Developing state-of-the-art data science tools for better child growth monitoring and analysis.
        </p>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
        <ul className="space-y-2">
          <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/support" className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-1">
              <span className="h-1 w-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"></span>
              Support
            </Link>
          </motion.li>
          <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/support" className="text-gray-600 hover:text-blue-500 transition-colors">Feedback</Link>
          </motion.li>
          <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-500 transition-colors">Privacy Policy</Link>
          </motion.li>
          <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/t&c" className="text-gray-600 hover:text-blue-500 transition-colors">Terms and Conditions</Link>
          </motion.li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Account</h4>
        <ul className="space-y-2">
          <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/signup" className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2">
              <FiUserPlus size={14} />
              Create account
            </Link>
          </motion.li>
          <motion.li whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/login" className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2">
              <FiLogIn size={14} />
              Sign in
            </Link>
          </motion.li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Connect With Us</h4>
        <div className="grid grid-cols-2 gap-4">
          <motion.a 
            href={linkedIn} 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            className="bg-white text-gray-800 hover:text-blue-500 p-3 rounded-xl border border-gray-100 flex flex-col items-center gap-1 transition-colors"
          >
            <FaLinkedinIn size={20} />
            <span className="text-xs">LinkedIn</span>
          </motion.a>
          <motion.a 
            href={instaLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            className="bg-white text-gray-800 hover:text-blue-500 p-3 rounded-xl border border-gray-100 flex flex-col items-center gap-1 transition-colors"
          >
            <FaInstagram size={20} />
            <span className="text-xs">Instagram</span>
          </motion.a>
          <motion.a 
            href={`mailto:${emailAddress}`} 
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            className="bg-white text-gray-800 hover:text-blue-500 p-3 rounded-xl border border-gray-100 flex flex-col items-center gap-1 transition-colors"
          >
            <FaEnvelope size={20} />
            <span className="text-xs">Email</span>
          </motion.a>
          <motion.a 
            href={`tel:${phoneNumber}`} 
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            className="bg-white text-gray-800 hover:text-blue-500 p-3 rounded-xl border border-gray-100 flex flex-col items-center gap-1 transition-colors"
          >
            <FaPhone size={20} />
            <span className="text-xs">Call</span>
          </motion.a>
        </div>
      </motion.div>
    </div>

    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-gray-200 mt-12 pt-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm"
        >
          © Copyright NouraSense 2024. All Rights Reserved.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 text-sm text-gray-500"
        >
          <Link to="/privacy" className="hover:text-blue-500 transition-colors">Privacy</Link>
          <span>•</span>
          <Link to="/cookies" className="hover:text-blue-500 transition-colors">Cookies</Link>
          <span>•</span>
          <Link to="/sitemap" className="hover:text-blue-500 transition-colors">Sitemap</Link>
        </motion.div>
      </div>
    </motion.div>
  </div>
</motion.footer>
      
      {isModalOpen && (
        <RoleSelectionModal 
          onClose={() => setIsModalOpen(false)} 
          onSelect={handleRoleSelection} 
          action={action}
        />
      )}
    </div>
  );
};

export default LandingPage;
            