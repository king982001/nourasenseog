import React, { useState } from 'react';
import { RoleSelectionModal } from '../ui/role-selection-modal';

const UseCasesAndModules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRoleSelect = (role, mode) => {
    if (role === 'doctor') {
      window.location.href = '/doctor/signup';
    } else if (role === 'patient') {
      window.location.href = '/signup';
    }
    setIsModalOpen(false);
  };

  const platformModules = [
    {
      title: "Growth Charts",
      description: "View percentile plots and analyze metrics like height-for-age, weight-for-age, and BMI instantly."
    },
    {
      title: "Analytics Dashboard",
      description: "Doctors get a real-time snapshot of child growth data, segment anomalies, and generate reports."
    }
  ];

  return (
    <div className="bg-white">
      {/* Use Cases Section */}
     
      {/* Platform Modules Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#4544DF] font-medium mb-2 block">TECHNOLOGY</span>
            <h2 className="text-3xl font-medium text-gray-900">Technology That Cares</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">One comprehensive solution for both parents and professionals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {platformModules.map((module, index) => (
              <div key={index} className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="rounded-lg overflow-hidden mb-6 h-64 bg-[#EBE9FF] flex items-center justify-center p-4">
                  <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden p-2 flex items-center justify-center max-w-xs mx-auto">
                    {/* Mock UI for module */}
                    {index === 0 ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src="/chart.png" 
                          alt="Growth Charts Interface" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src="/dashboard.png" 
                          alt="Analytics Dashboard Interface" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <h3 className="text-2xl font-medium mb-3">{module.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
                  <div>
                    <button 
                      onClick={handleModalOpen}
                      className="inline-block px-6 py-3 bg-[#4544DF] text-white rounded-full font-medium hover:bg-[#4544DF]/90 transition-colors duration-300"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSelect={handleRoleSelect}
        mode="signup"
      />
    </div>
  );
};

export default UseCasesAndModules;