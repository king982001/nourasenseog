"use client";
import React, { useState } from 'react';
import { ContainerScroll } from "../ui/container-scroll-animation";
import { RoleSelectionModal } from '../ui/role-selection-modal';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('signup');

  const handleModalOpen = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRoleSelect = (role) => {
    if (role === 'doctor') {
      window.location.href = '/doctor/signup';
    } else if (role === 'patient') {
      window.location.href = '/signup';
    } else if (role === 'login') {
      setModalMode('login');
      return;
    } else if (role === 'signup') {
      setModalMode('signup');
      return;
    } else if (role === 'doctor-dashboard') {
      window.location.href = '/doctor/';
    } else if (role === 'parent-dashboard') {
      window.location.href = '/dashboard';
    }
    setIsModalOpen(false);
  };

  return (
    <section className="min-h-screen w-full bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col overflow-hidden w-full">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl sm:text-5xl font-normal leading-tight mb-6">
                <span className="text-blue-600">Revolutionize</span> <span className="text-black">pediatric care with Nourasense's</span> <span className="text-blue-600">AI-powered diagnostics</span> <span className="text-black">and</span> <span className="text-blue-600">growth analytics</span>
              </h1>

              <div className="flex flex-col items-center gap-4 mt-8 mb-8">
                <button
                  onClick={() => handleModalOpen('signup')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition"
                >
                  Start Free Trial
                </button>
                <p className="text-gray-600 text-lg">
                  Nourasense for every parent, everywhere.
                </p>
              </div>
            </>
          }>
          <div className="relative w-full h-full">
            <img
              src="/1.png"
              alt="Child growth monitoring platform interface"
              // className="w-full h-full object-cover object-left-top rounded-2xl"
              draggable={false}
            />

            {/* Symptom input UI overlay */}
            {/* <div className="absolute top-10 left-10 bg-white p-4 rounded-lg shadow-md">
              <div className="text-sm font-medium text-blue-600 mb-2">ADD YOUR SYMPTOMS</div>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm">
                  Lower back pain
                </div>
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm">
                  Back pain that comes and goes
                </div>
              </div>
            </div> */}

            {/* Next steps UI overlay */}
            {/* <div className="absolute bottom-10 left-10 bg-white p-4 rounded-lg shadow-md">
              <div className="text-sm font-medium text-blue-600 mb-2">NEXT STEPS</div>
              <div className="text-lg font-medium mb-2">Self-care</div>
              <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm">
                Review self-care options
              </div>
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-green-400 p-4 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div> */}


          </div>
        </ContainerScroll>
      </div>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSelect={handleRoleSelect}
        mode={modalMode}
      />
    </section>
  );
};

export default Hero;