import React from 'react';

const EnhancedWorkflow = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your account to get started with our platform",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      title: "Create Child Profile",
      description: "Add your child's basic information and medical history",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          <path d="M6 9l6 6"></path>
          <path d="M12 9l-6 6"></path>
        </svg>
      )
    },
    {
      title: "Enter Measurements",
      description: "Input height, weight, and other growth measurements",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <rect x="2" y="3" width="6" height="18"></rect>
          <rect x="12" y="3" width="3" height="18"></rect>
          <rect x="20" y="3" width="2" height="18"></rect>
          <line x1="2" y1="9" x2="8" y2="9"></line>
          <line x1="2" y1="15" x2="8" y2="15"></line>
          <line x1="12" y1="9" x2="15" y2="9"></line>
          <line x1="12" y1="15" x2="15" y2="15"></line>
          <line x1="20" y1="9" x2="22" y2="9"></line>
          <line x1="20" y1="15" x2="22" y2="15"></line>
        </svg>
      )
    },
    {
      title: "Diagnosis",
      description: "Our AI analyzes the data to identify growth patterns",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      )
    },
    {
      title: "Nutrient Analysis",
      description: "Get detailed insights into nutritional requirements",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      )
    },
    {
      title: "Create Diet Plan",
      description: "Receive personalized dietary recommendations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      title: "Generate Report",
      description: "Download comprehensive growth and nutrition reports",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <span className="text-[#4544DF] font-medium mb-2 block">HOW IT WORKS</span>
          <h2 className="text-3xl font-medium text-gray-900">Your Child's Growth Journey</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">Follow these simple steps to monitor and improve your child's growth and nutrition.</p>
        </div>

        {/* Compact connected steps */}
        <div className="relative mt-10">
          {/* Horizontal connecting line with animation */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-100 hidden md:block">
            <div className="h-full bg-[#4544DF] animate-grow-line"></div>
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative opacity-0 animate-slide-up" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Enhanced Circle connector */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-16 h-16 rounded-full bg-[#EBE9FF] z-10 flex items-center justify-center shadow-md transform transition-all duration-300 hover:scale-110 hover:bg-[#d6d5ff] border-2 border-[#4544DF]/20 group">
                    <div className="transition-transform duration-500 group-hover:rotate-12">
                      {step.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 font-bold text-xs bg-[#4544DF] text-white rounded-full w-6 h-6 flex items-center justify-center border border-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                {/* Compact content */}
                <div className="text-center px-2">
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <button 
            className="inline-block px-6 py-3 bg-[#4544DF] text-white rounded-full font-medium hover:bg-[#3635b2] transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes growLine {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-grow-line {
          animation: growLine 1.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default EnhancedWorkflow;