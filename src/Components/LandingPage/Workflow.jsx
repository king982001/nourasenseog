import React from 'react';

const EnhancedWorkflow = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your account to get started with our platform",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      title: "Create Child Profile",
      description: "Add your child's basic information and medical history",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M9 21h6"></path>
          <path d="M12 21v-4"></path>
          <path d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"></path>
          <path d="M8 17c-2.21 0-4-1.79-4-4s1.79-4 4-4"></path>
          <path d="M16 17c2.21 0 4-1.79 4-4s-1.79-4-4-4"></path>
        </svg>
      )
    },
    {
      title: "Enter Measurements",
      description: "Input height, weight, and other growth measurements",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M2 3h6a4 4 0 0 1 4 4v14"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14"></path>
          <path d="M6 8h4"></path>
          <path d="M14 8h4"></path>
          <path d="M6 13h4"></path>
          <path d="M14 13h4"></path>
          <path d="M6 18h4"></path>
          <path d="M14 18h4"></path>
        </svg>
      )
    },
    {
      title: "Diagnosis",
      description: "Our AI analyzes the data to identify growth patterns",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <path d="M12 22v-8"></path>
          <path d="M12 14l-7-4"></path>
          <path d="M12 14l7-4"></path>
        </svg>
      )
    },
    {
      title: "Nutrient Analysis",
      description: "Get detailed insights into nutritional requirements",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M4 11h16a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a1 1 0 0 1 1-1z"></path>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          <line x1="8" y1="15" x2="16" y2="15"></line>
        </svg>
      )
    },
    {
      title: "Create Diet Plan",
      description: "Receive personalized dietary recommendations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M12 3v18"></path>
          <path d="M5 10h14"></path>
          <path d="M5 16h14"></path>
          <path d="M19 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"></path>
        </svg>
      )
    },
    {
      title: "Generate Report",
      description: "Download comprehensive growth and nutrition reports",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 opacity-0 animate-fade-in">
          <span className="text-[#4544DF] font-medium mb-2 block">HOW IT WORKS</span>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900">Your Child's Growth Journey</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-sm md:text-base">Follow these simple steps to monitor and improve your child's growth and nutrition.</p>
        </div>

        {/* Mobile-optimized steps */}
        <div className="relative mt-6 md:mt-10">
          {/* Horizontal connecting line only visible on desktop */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-100 hidden md:block">
            <div className="h-full bg-[#4544DF] animate-grow-line"></div>
          </div>
          
          {/* Vertical line for mobile */}
          <div className="absolute top-0 bottom-0 left-8 w-1 bg-gray-100 md:hidden">
            <div className="h-full bg-[#4544DF] animate-grow-line-vertical"></div>
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative opacity-0 animate-slide-up flex md:block items-start" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Enhanced Circle connector */}
                <div className="flex-shrink-0 md:flex md:justify-center mb-0 md:mb-6">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#EBE9FF] z-10 flex items-center justify-center shadow-md transform transition-all duration-300 hover:scale-110 hover:bg-[#d6d5ff] border-2 border-[#4544DF]/20 group">
                    <div className="transition-transform duration-500 group-hover:rotate-12">
                      {step.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 font-bold text-xs bg-[#4544DF] text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-white shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                {/* Compact content */}
                <div className="ml-4 md:ml-0 md:text-center px-2">
                  <h3 className="text-base md:text-lg font-medium mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
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
        
        @keyframes growLineVertical {
          from { height: 0; }
          to { height: 100%; }
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
        
        .animate-grow-line-vertical {
          animation: growLineVertical 1.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default EnhancedWorkflow;