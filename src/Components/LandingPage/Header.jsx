"use client";

import { useState, useEffect } from "react";
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

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div onClick={() => window.location.href = "/"}>
            <NavbarLogo />
          </div>
          <NavItems items={navItems} onItemClick={(item) => handleNavigation(item.link)} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
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
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

