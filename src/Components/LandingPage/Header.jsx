"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "../ui/resizable-navbar";
import { RoleSelectionModal } from "../ui/role-selection-modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const [doctorLoggedIn, setDoctorLoggedIn] = useState(false);
  const [patientLoggedIn, setPatientLoggedIn] = useState(false);
  const [doctorAccount, setDoctorAccount] = useState(null);
  const [patientAccount, setPatientAccount] = useState(null);
  const [isUnifiedDropdownOpen, setIsUnifiedDropdownOpen] = useState(false);
  const unifiedDropdownRef = useRef(null);
  const unifiedDropdownTimeoutRef = useRef(null);

  // Handle modal actions
  const handleModalOpen = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRoleSelect = (role) => {
    if (role === 'signup') {
      setModalMode('signup');
      return;
    }
    if (role === 'login') {
      setModalMode('login');
      return;
    }
    if (role === 'doctor-dashboard') {
      window.location.href = '/Doctor/';
      setIsModalOpen(false);
      return;
    }
    if (role === 'parent-dashboard') {
      window.location.href = '/Parent/';
      setIsModalOpen(false);
      return;
    }

    const action = modalMode === 'login' ? 'login' : 'signup';
    handleLoginOption(`${role}-${action}`);
    setIsModalOpen(false);
  };

  // Unified dropdown handlers
  const handleUnifiedDropdownOpen = () => {
    if (unifiedDropdownTimeoutRef.current) {
      clearTimeout(unifiedDropdownTimeoutRef.current);
      unifiedDropdownTimeoutRef.current = null;
    }
    setIsUnifiedDropdownOpen(true);
  };

  const handleUnifiedDropdownClose = () => {
    unifiedDropdownTimeoutRef.current = setTimeout(() => {
      setIsUnifiedDropdownOpen(false);
    }, 200);
  };

  const toggleUnifiedDropdown = (e) => {
    e.stopPropagation();
    setIsUnifiedDropdownOpen(!isUnifiedDropdownOpen);
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
    // Handle login/signup options
    switch (option) {
      case 'doctor-login':
        // Navigate to doctor login page
        window.location.href = '/Doctor/Login';
        break;
      case 'parent-login':
        // Navigate to parent login page
        window.location.href = '/login';
        break;
      case 'doctor-signup':
        // Navigate to doctor signup page
        window.location.href = '/SignUp';
        break;
      case 'parent-signup':
        // Navigate to parent signup page
        window.location.href = '/SignUp';
        break;
      case 'doctor-logout':
        // Handle doctor logout
        localStorage.removeItem("DoctorToken");
        localStorage.removeItem("DoctorAccount");
        setDoctorLoggedIn(false);
        setDoctorAccount(null);
        window.location.reload();
        break;
      case 'patient-logout':
        // Handle patient logout
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

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (unifiedDropdownTimeoutRef.current) {
        clearTimeout(unifiedDropdownTimeoutRef.current);
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

  const handleProfileOption = (option) => {
    // Implement profile option logic
    console.log(`Handling profile option: ${option}`);
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
                onClick={() => {
                  handleModalOpen('login');
                  setIsUnifiedDropdownOpen(false);
                }}
              >
                <div 
                  className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
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
                          className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-neutral-800"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-primary-blue font-medium border-2 border-white dark:border-neutral-800">
                          {patientAccount?.name ? patientAccount.name.charAt(0) : "P"}
                        </div>
                      )
                    )}
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Show login/signup buttons if no accounts are logged in */}
            {(!doctorLoggedIn && !patientLoggedIn) && (
              <div className="flex items-center gap-4">
                <NavbarButton 
                  variant="secondary"
                  onClick={() => handleModalOpen('login')}
                >
                  Login
                </NavbarButton>
                <NavbarButton 
                  variant="primary"
                  onClick={() => handleModalOpen('signup')}
                >
                  Sign Up
                </NavbarButton>
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
                href={item.link}
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
                        handleLoginOption('doctor-logout');
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
                        handleLoginOption('patient-logout');
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
              
              {/* Login/Signup Buttons for Mobile */}
              {(!doctorLoggedIn && !patientLoggedIn) && (
                <div className="flex flex-col gap-2">
                  <NavbarButton
                    onClick={() => {
                      handleModalOpen('login');
                      setIsMobileMenuOpen(false);
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => {
                      handleModalOpen('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    variant="primary"
                    className="w-full"
                  >
                    Sign Up
                  </NavbarButton>
                </div>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSelect={handleRoleSelect}
        mode={modalMode}
        doctorAccount={doctorAccount}
        patientAccount={patientAccount}
        doctorLoggedIn={doctorLoggedIn}
        patientLoggedIn={patientLoggedIn}
      />
    </div>
  );
}

