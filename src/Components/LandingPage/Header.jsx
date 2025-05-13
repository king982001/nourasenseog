"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "../ui/resizable-navbar";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Partners",
      link: "#partners",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    },
    {
      name: "Solutions",
      link: "#solutions",
    },
    {
      name: "Platform",
      link: "#platform",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Support",
      link: "/support",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDoctorProfileDropdownOpen, setIsDoctorProfileDropdownOpen] = useState(false);
  const [isPatientProfileDropdownOpen, setIsPatientProfileDropdownOpen] = useState(false);
  const [isUnifiedDropdownOpen, setIsUnifiedDropdownOpen] = useState(false);
  const [doctorLoggedIn, setDoctorLoggedIn] = useState(false);
  const [patientLoggedIn, setPatientLoggedIn] = useState(false);
  const [doctorAccount, setDoctorAccount] = useState(null);
  const [patientAccount, setPatientAccount] = useState(null);
  const closeTimeoutRef = useRef(null);
  const profileTimeoutRef = useRef(null);
  const doctorProfileTimeoutRef = useRef(null);
  const patientProfileTimeoutRef = useRef(null);
  const unifiedDropdownTimeoutRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const doctorProfileDropdownRef = useRef(null);
  const patientProfileDropdownRef = useRef(null);
  const unifiedDropdownRef = useRef(null);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const signupDropdownRef = useRef(null);
  const signupDropdownTimeoutRef = useRef(null);

  // Check if users are logged in on component mount
  useEffect(() => {
    const doctorToken = localStorage.getItem("DoctorToken");
    const patientToken = localStorage.getItem("token");
    
    if (doctorToken) {
      setDoctorLoggedIn(true);
      const account = JSON.parse(localStorage.getItem("DoctorAccount") || "{}");
      setDoctorAccount(account);
    }
    
    if (patientToken) {
      setPatientLoggedIn(true);
      const account = JSON.parse(localStorage.getItem("account") || "{}");
      setPatientAccount(account);
    }
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside login dropdown
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
        setIsLoginDropdownOpen(false);
      }
      
      // Check if click is outside doctor profile dropdown
      if (doctorProfileDropdownRef.current && !doctorProfileDropdownRef.current.contains(event.target)) {
        setIsDoctorProfileDropdownOpen(false);
      }
      
      // Check if click is outside patient profile dropdown
      if (patientProfileDropdownRef.current && !patientProfileDropdownRef.current.contains(event.target)) {
        setIsPatientProfileDropdownOpen(false);
      }
      
      // Check if click is outside unified dropdown
      if (unifiedDropdownRef.current && !unifiedDropdownRef.current.contains(event.target)) {
        setIsUnifiedDropdownOpen(false);
      }
      
      // Check if click is outside signup dropdown
      if (signupDropdownRef.current && !signupDropdownRef.current.contains(event.target)) {
        setIsSignupDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Login dropdown handlers
  const handleLoginDropdownOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsLoginDropdownOpen(true);
    setIsDoctorProfileDropdownOpen(false);
    setIsPatientProfileDropdownOpen(false);
  };

  const handleLoginDropdownClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsLoginDropdownOpen(false);
    }, 200); // 200ms delay before closing
  };
  
  // Unified dropdown handlers
  const handleUnifiedDropdownOpen = () => {
    if (unifiedDropdownTimeoutRef.current) {
      clearTimeout(unifiedDropdownTimeoutRef.current);
      unifiedDropdownTimeoutRef.current = null;
    }
    setIsUnifiedDropdownOpen(true);
    setIsLoginDropdownOpen(false);
  };

  const handleUnifiedDropdownClose = () => {
    unifiedDropdownTimeoutRef.current = setTimeout(() => {
      setIsUnifiedDropdownOpen(false);
    }, 200); // 200ms delay before closing
  };

  // Toggle unified dropdown
  const toggleUnifiedDropdown = (e) => {
    e.stopPropagation();
    setIsUnifiedDropdownOpen(!isUnifiedDropdownOpen);
    setIsLoginDropdownOpen(false);
  };

  const handleNavigation = (link) => {
    if (link.startsWith('#')) {
      const sectionId = link.substring(1);
      if (window.location.pathname === '/') {
        scrollToSection(sectionId);
      } else {
        // First, redirect to the homepage
        const baseUrl = window.location.origin;
        window.location.href = `${baseUrl}/#${sectionId}`;
      }
    } else {
      window.location.href = link;
    }
  };
  
  const handleLoginOption = (option) => {
    setIsLoginDropdownOpen(false);
    // Navigate to the appropriate login/signup page
    switch(option) {
      case 'doctor-login':
        window.location.href = '/doctor/login';
        break;
      case 'doctor-signup':
        window.location.href = '/doctor/signup';
        break;
      case 'parent-login':
        window.location.href = '/login';
        break;
      case 'parent-signup':
        window.location.href = '/signup';
        break;
      default:
        break;
    }
  };
  
  const handleProfileOption = (option) => {
    setIsProfileDropdownOpen(false);
    
    switch(option) {
      case 'doctor-dashboard':
        window.location.href = '/doctor/';
        break;
      case 'doctor-logout':
        localStorage.removeItem("DoctorToken");
        localStorage.removeItem("DoctorAccount");
        setDoctorLoggedIn(false);
        setDoctorAccount(null);
        window.location.reload();
        break;
      case 'patient-dashboard':
        window.location.href = '/dashboard';
        break;
      case 'patient-logout':
        localStorage.removeItem("token");
        localStorage.removeItem("account");
        setPatientLoggedIn(false);
        setPatientAccount(null);
        window.location.reload();
        break;
      default:
        break;
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle scrolling when redirected from another page with a hash
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Give the page some time to load
    }
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (profileTimeoutRef.current) {
        clearTimeout(profileTimeoutRef.current);
      }
      if (doctorProfileTimeoutRef.current) {
        clearTimeout(doctorProfileTimeoutRef.current);
      }
      if (patientProfileTimeoutRef.current) {
        clearTimeout(patientProfileTimeoutRef.current);
      }
      if (unifiedDropdownTimeoutRef.current) {
        clearTimeout(unifiedDropdownTimeoutRef.current);
      }
      if (signupDropdownTimeoutRef.current) {
        clearTimeout(signupDropdownTimeoutRef.current);
      }
    };
  }, []);

  // Helper function to get display name
  const getDisplayName = () => {
    if (doctorLoggedIn && doctorAccount) {
      return `Dr. ${doctorAccount.name || ''} ${doctorAccount.surname || ''}`;
    }
    if (patientLoggedIn && patientAccount) {
      return `${patientAccount.name || ''} ${patientAccount.surname || ''}`;
    }
    return 'Profile';
  };
  
  // Helper function to get profile image
  const getProfileImage = () => {
    if (doctorLoggedIn && doctorAccount?.registration?.selfie_image) {
      return doctorAccount.registration.selfie_image;
    }
    if (patientLoggedIn && patientAccount?.profile_picture) {
      return patientAccount.profile_picture;
    }
    return null;
  };
  
  // Helper function to get initial for avatar
  const getInitial = () => {
    if (doctorLoggedIn && doctorAccount?.name) {
      return doctorAccount.name.charAt(0);
    }
    if (patientLoggedIn && patientAccount?.name) {
      return patientAccount.name.charAt(0);
    }
    return "?";
  };

  // Toggle login dropdown
  const toggleLoginDropdown = (e) => {
    e.stopPropagation();
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
    setIsDoctorProfileDropdownOpen(false);
    setIsPatientProfileDropdownOpen(false);
  };

  // Signup dropdown handlers
  const handleSignupDropdownOpen = () => {
    if (signupDropdownTimeoutRef.current) {
      clearTimeout(signupDropdownTimeoutRef.current);
      signupDropdownTimeoutRef.current = null;
    }
    setIsSignupDropdownOpen(true);
  };

  const handleSignupDropdownClose = () => {
    signupDropdownTimeoutRef.current = setTimeout(() => {
      setIsSignupDropdownOpen(false);
    }, 200);
  };

  const toggleSignupDropdown = (e) => {
    e.stopPropagation();
    setIsSignupDropdownOpen(!isSignupDropdownOpen);
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div onClick={() => window.location.href = "/"}>
            <NavbarLogo />
          </div>
          <NavItems items={navItems} onItemClick={(item) => handleNavigation(item.link)} />
          <div className="flex items-center gap-4 pr-10">
            {/* Unified Profile Dropdown for Desktop - shows when at least one account is logged in */}
            {(doctorLoggedIn || patientLoggedIn) && (
              <div 
                className="relative z-10"
                onMouseEnter={handleUnifiedDropdownOpen}
                onMouseLeave={handleUnifiedDropdownClose}
                ref={unifiedDropdownRef}
              >
                <div 
                  className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                  onClick={toggleUnifiedDropdown}
                >
                  <div className="flex -space-x-2">
                    {doctorLoggedIn && (
                      doctorAccount?.registration?.selfie_image ? (
                        <img 
                          src={doctorAccount.registration.selfie_image} 
                          alt="Doctor Profile" 
                          className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-neutral-800 z-20"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary-blue font-medium border-2 border-white dark:border-neutral-800 z-20">
                          {doctorAccount?.name ? doctorAccount.name.charAt(0) : "D"}
                        </div>
                      )
                    )}
                    {patientLoggedIn && (
                      patientAccount?.profile_picture ? (
                        <img 
                          src={patientAccount.profile_picture} 
                          alt="Patient Profile" 
                          className={`w-8 h-8 rounded-full object-cover border-2 border-white dark:border-neutral-800 ${doctorLoggedIn ? 'z-10' : 'z-20'}`}
                        />
                      ) : (
                        <div className={`w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-primary-blue font-medium border-2 border-white dark:border-neutral-800 ${doctorLoggedIn ? 'z-10' : 'z-20'}`}>
                          {patientAccount?.name ? patientAccount.name.charAt(0) : "P"}
                        </div>
                      )
                    )}
                  </div>
                  <span className="text-sm font-medium hidden md:block">My Accounts</span>
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* No-gap hover bridge */}
                <div className="absolute left-0 w-full h-4 -bottom-4 bg-transparent"></div>
                
                {isUnifiedDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-1 w-64 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 z-20"
                    onMouseEnter={handleUnifiedDropdownOpen}
                    onMouseLeave={handleUnifiedDropdownClose}
                  >
                    <div className="py-2" role="menu" aria-orientation="vertical">
                      {/* Doctor account section */}
                      {doctorLoggedIn && (
                        <>
                          <div className="px-4 py-2 text-base font-medium text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700">
                            Doctor Account
                          </div>
                          <div className="px-4 py-3 flex items-center gap-3">
                            {doctorAccount?.registration?.selfie_image ? (
                              <img 
                                src={doctorAccount.registration.selfie_image} 
                                alt="Doctor Profile" 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary-blue font-medium">
                                {doctorAccount?.name ? doctorAccount.name.charAt(0) : "D"}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-white">Dr. {doctorAccount?.name || ''} {doctorAccount?.surname || ''}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{doctorAccount?.email || ''}</p>
                            </div>
                          </div>
                          <div className="flex px-4 pb-2 gap-2">
                            <button
                              onClick={() => handleProfileOption('doctor-dashboard')}
                              className="flex-1 px-2 py-1.5 text-sm text-center rounded bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-800 dark:text-white"
                              role="menuitem"
                            >
                              Dashboard
                            </button>
                            <button
                              onClick={() => handleProfileOption('doctor-logout')}
                              className="flex-1 px-2 py-1.5 text-sm text-center rounded bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                              role="menuitem"
                            >
                              Logout
                            </button>
                          </div>
                        </>
                      )}
                      
                      {/* Patient account section */}
                      {patientLoggedIn && (
                        <>
                          <div className={`px-4 py-2 text-base font-medium text-neutral-900 dark:text-white ${doctorLoggedIn ? 'border-t border-b border-neutral-200 dark:border-neutral-700 mt-2' : 'border-b border-neutral-200 dark:border-neutral-700'}`}>
                            Parent Account
                          </div>
                          <div className="px-4 py-3 flex items-center gap-3">
                            {patientAccount?.profile_picture ? (
                              <img 
                                src={patientAccount.profile_picture} 
                                alt="Patient Profile" 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-primary-blue font-medium">
                                {patientAccount?.name ? patientAccount.name.charAt(0) : "P"}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-white">{patientAccount?.name || ''} {patientAccount?.surname || ''}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{patientAccount?.email || ''}</p>
                            </div>
                          </div>
                          <div className="flex px-4 pb-2 gap-2">
                            <button
                              onClick={() => handleProfileOption('patient-dashboard')}
                              className="flex-1 px-2 py-1.5 text-sm text-center rounded bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-800 dark:text-white"
                              role="menuitem"
                            >
                              Dashboard
                            </button>
                            <button
                              onClick={() => handleProfileOption('patient-logout')}
                              className="flex-1 px-2 py-1.5 text-sm text-center rounded bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                              role="menuitem"
                            >
                              Logout
                            </button>
                          </div>
                        </>
                      )}
                      
                      {/* Login options for account types not logged in */}
                      {(!doctorLoggedIn || !patientLoggedIn) && (
                        <div className="border-t border-neutral-200 dark:border-neutral-700 mt-1 pt-2">
                          <div className="px-4 py-2 text-sm font-medium text-neutral-900 dark:text-white">
                            Add Another Account
                          </div>
                          {!doctorLoggedIn && (
                            <button
                              onClick={() => handleLoginOption('doctor-login')}
                              className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-neutral-700"
                              role="menuitem"
                            >
                              Login as Doctor
                            </button>
                          )}
                          {!patientLoggedIn && (
                            <button
                              onClick={() => handleLoginOption('parent-login')}
                              className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-neutral-700"
                              role="menuitem"
                            >
                              Login as Parent
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Show login dropdown if no accounts are logged in */}
            {(!doctorLoggedIn && !patientLoggedIn) && (
              <div className="flex items-center gap-4">
                {/* Login Button with Dropdown */}
                <div 
                  className="relative z-10"
                  onMouseEnter={handleLoginDropdownOpen}
                  onMouseLeave={handleLoginDropdownClose}
                  ref={loginDropdownRef}
                >
                  <NavbarButton 
                    variant="secondary"
                    onClick={toggleLoginDropdown}
                  >
                    Login
                  </NavbarButton>
                  
                  {/* No-gap hover bridge */}
                  <div className="absolute left-0 w-full h-4 -bottom-4 bg-transparent"></div>
                  
                  {isLoginDropdownOpen && (
                    <div 
                      className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 z-20"
                      onMouseEnter={handleLoginDropdownOpen}
                      onMouseLeave={handleLoginDropdownClose}
                    >
                      <div className="py-2" role="menu" aria-orientation="vertical">
                        <button
                          onClick={() => handleLoginOption('doctor-login')}
                          className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                          role="menuitem"
                        >
                          Login as Doctor
                        </button>
                        <button
                          onClick={() => handleLoginOption('parent-login')}
                          className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                          role="menuitem"
                        >
                          Login as Parent
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sign Up Button with Dropdown */}
                <div 
                  className="relative z-10"
                  onMouseEnter={handleSignupDropdownOpen}
                  onMouseLeave={handleSignupDropdownClose}
                  ref={signupDropdownRef}
                >
                  <NavbarButton 
                    variant="primary"
                    onClick={toggleSignupDropdown}
                  >
                    Sign Up
                  </NavbarButton>
                  
                  {/* No-gap hover bridge */}
                  <div className="absolute left-0 w-full h-4 -bottom-4 bg-transparent"></div>
                  
                  {isSignupDropdownOpen && (
                    <div 
                      className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 z-20"
                      onMouseEnter={handleSignupDropdownOpen}
                      onMouseLeave={handleSignupDropdownClose}
                    >
                      <div className="py-2" role="menu" aria-orientation="vertical">
                        <button
                          onClick={() => handleLoginOption('doctor-signup')}
                          className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                          role="menuitem"
                        >
                          Sign Up as Doctor
                        </button>
                        <button
                          onClick={() => handleLoginOption('parent-signup')}
                          className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                          role="menuitem"
                        >
                          Sign Up as Parent
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div onClick={() => window.location.href = "/"}>
              <NavbarLogo />
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}t
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.link);
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {/* Doctor Account Section */}
              {doctorLoggedIn && (
                <div className="w-full border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-medium text-neutral-900 dark:text-white mb-2">Doctor Account</div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg mb-4">
                    <div className="flex items-center gap-3">
                      {doctorAccount?.registration?.selfie_image ? (
                        <img 
                          src={doctorAccount.registration.selfie_image} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary-blue font-medium">
                          {doctorAccount?.name ? doctorAccount.name.charAt(0) : "D"}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">Dr. {doctorAccount?.name || ''} {doctorAccount?.surname || ''}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{doctorAccount?.email || ''}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <NavbarButton
                      onClick={() => {
                        handleProfileOption('doctor-dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      variant="secondary"
                      className="flex-1"
                    >
                      <div className="flex items-center justify-center">
                        Dashboard
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    </NavbarButton>
                    <NavbarButton
                      onClick={() => {
                        handleProfileOption('doctor-logout');
                        setIsMobileMenuOpen(false);
                      }}
                      variant="secondary"
                      className="flex-1"
                    >
                      <div className="flex items-center justify-center text-red-600">
                        Logout
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                    </NavbarButton>
                  </div>
                </div>
              )}
              
              {/* Patient Account Section */}
              {patientLoggedIn && (
                <div className="w-full border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-medium text-neutral-900 dark:text-white mb-2">Parent Account</div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg mb-4">
                    <div className="flex items-center gap-3">
                      {patientAccount?.profile_picture ? (
                        <img 
                          src={patientAccount.profile_picture} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-primary-blue font-medium">
                          {patientAccount?.name ? patientAccount.name.charAt(0) : "P"}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{patientAccount?.name || ''} {patientAccount?.surname || ''}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{patientAccount?.email || ''}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <NavbarButton
                      onClick={() => {
                        handleProfileOption('patient-dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      variant="secondary"
                      className="flex-1"
                    >
                      <div className="flex items-center justify-center">
                        Dashboard
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    </NavbarButton>
                    <NavbarButton
                      onClick={() => {
                        handleProfileOption('patient-logout');
                        setIsMobileMenuOpen(false);
                      }}
                      variant="secondary"
                      className="flex-1"
                    >
                      <div className="flex items-center justify-center text-red-600">
                        Logout
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                    </NavbarButton>
                  </div>
                </div>
              )}
              
              {/* Login Options for Accounts Not Logged In */}
              {(!doctorLoggedIn || !patientLoggedIn) && (
                <div className="w-full">
                  {!doctorLoggedIn && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="text-base font-medium text-neutral-900 dark:text-white mb-2">Doctor</div>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <NavbarButton
                          onClick={() => {
                            handleLoginOption('doctor-login');
                            setIsMobileMenuOpen(false);
                          }}
                          variant="secondary"
                          className="flex-1"
                        >
                          <div className="flex items-center justify-center">
                            Login
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                          </div>
                        </NavbarButton>
                        <NavbarButton
                          onClick={() => {
                            handleLoginOption('doctor-signup');
                            setIsMobileMenuOpen(false);
                          }}
                          variant="secondary"
                          className="flex-1"
                        >
                          <div className="flex items-center justify-center">
                            Sign Up
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                          </div>
                        </NavbarButton>
                      </div>
                    </>
                  )}
                  
                  {!patientLoggedIn && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="text-base font-medium text-neutral-900 dark:text-white mb-2">Parent</div>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <NavbarButton
                          onClick={() => {
                            handleLoginOption('parent-login');
                            setIsMobileMenuOpen(false);
                          }}
                          variant="secondary"
                          className="flex-1"
                        >
                          <div className="flex items-center justify-center">
                            Login
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                          </div>
                        </NavbarButton>
                        <NavbarButton
                          onClick={() => {
                            handleLoginOption('parent-signup');
                            setIsMobileMenuOpen(false);
                          }}
                          variant="secondary"
                          className="flex-1"
                        >
                          <div className="flex items-center justify-center">
                            Sign Up
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                          </div>
                        </NavbarButton>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

