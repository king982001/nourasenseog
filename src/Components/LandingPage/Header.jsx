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
  const closeTimeoutRef = useRef(null);

  const handleLoginDropdownOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsLoginDropdownOpen(true);
  };

  const handleLoginDropdownClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsLoginDropdownOpen(false);
    }, 200); // 200ms delay before closing
  };

  const handleNavigation = (link) => {
    console.log(link);
    if (link.startsWith('#')) {
      console.log(link);
      const sectionId = link.substring(1);
      if (window.location.pathname === '/') {
        scrollToSection(sectionId);
      } else {
        // First, redirect to the homepage
        const baseUrl = window.location.origin;
        window.location.href = `${baseUrl}/#${sectionId}`;
  
        // After the redirection, scroll to the section on the homepage (handled via useEffect)
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

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
            <div 
              className="relative"
              onMouseEnter={handleLoginDropdownOpen}
              onMouseLeave={handleLoginDropdownClose}
            >
              <NavbarButton 
                variant="secondary"
              >
                Login
              </NavbarButton>
              
              {/* No-gap hover bridge */}
              <div className="absolute left-0 w-full h-4 -bottom-4 bg-transparent"></div>
              
              {isLoginDropdownOpen && (
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 top-full w-56 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 z-10"
                  onMouseEnter={handleLoginDropdownOpen}
                  onMouseLeave={handleLoginDropdownClose}
                >
                  <div className="py-2" role="menu" aria-orientation="vertical">
                    {/* Doctor Section */}
                    <div className="px-4 py-2 text-base font-medium text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700">
                      Doctor
                    </div>
                    <button
                      onClick={() => handleLoginOption('doctor-login')}
                      className="block w-full text-left px-6 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        Login
                      </div>
                    </button>
                    <button
                      onClick={() => handleLoginOption('doctor-signup')}
                      className="block w-full text-left px-6 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        Sign Up
                      </div>
                    </button>
                    
                    {/* Parent Section */}
                    <div className="px-4 py-2 text-base font-medium text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 mt-2">
                      Parent
                    </div>
                    <button
                      onClick={() => handleLoginOption('parent-login')}
                      className="block w-full text-left px-6 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        Login
                      </div>
                    </button>
                    <button
                      onClick={() => handleLoginOption('parent-signup')}
                      className="block w-full text-left px-6 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        Sign Up
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
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
              <div className="w-full">
                <div className="text-base font-medium text-neutral-900 dark:text-white mb-2">Doctor</div>
                <div className="flex gap-2 mb-3">
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
                
                <div className="text-base font-medium text-neutral-900 dark:text-white mb-2">Parent</div>
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
              </div>
              {/* <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Book a call
              </NavbarButton> */}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

