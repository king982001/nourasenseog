import { useState } from 'react';

// WobbleCard component (simplified version)
const WobbleCard = ({ children, containerClassName, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${containerClassName} ${isHovered ? 'shadow-xl scale-[1.01]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-4 sm:p-6 lg:p-8 h-full ${className}`}>
        {children}
      </div>
    </div>
  );
};

const UseCasesAndModules = () => {
  // State for mobile visualization toggling
  const showFirstVisualization = true;
  const showSecondVisualization= true;
  // const [showFirstVisualization, setShowFirstVisualization] = useState(true);
  // const [showSecondVisualization, setShowSecondVisualization] = useState(true);
  
  // Sample data
  const useCases = [
    {
      title: "Growth monitoring",
      subtitle: "Easy measurement tracking",
      description: "Guide parents and pediatricians to track child growth measurements accurately and consistently over time"
    },
    {
      title: "Pre-visit data collection",
      subtitle: "Streamline appointments",
      description: "Collect relevant growth data before telehealth or in-person consultations"
    },
    {
      title: "Healthcare professional dashboard",
      subtitle: "Comprehensive analysis",
      description: "Optimize growth analysis efficiency and decision-making for pediatricians and healthcare providers"
    }
  ];

  const platformModules = [
    {
      title: "Growth Tracking",
      description: "Integrates into websites, apps, portals, and call centers for measurement input, growth chart analysis, condition insights, and patient education."
    },
    {
      title: "Analytics Dashboard",
      description: "Gather measurements, risk factors, history, and demographics pre-visit to reduce admin tasks and increase physician-patient time."
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <span className="text-indigo-600 font-medium mb-2 block">TECHNOLOGY</span>
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900">Platform modules</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-sm sm:text-base">
            Our comprehensive suite of tools provides everything you need for effective child growth monitoring and analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto w-full">
          {/* Growth Tracking Card */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-indigo-600 min-h-[300px] md:min-h-[400px] lg:min-h-[300px] relative overflow-hidden"
            className="z-10"
          >
            <div className="max-w-full sm:max-w-xs md:max-w-sm relative z-10">
              <h2 className="text-left text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                {platformModules[0].title}
              </h2>
              <p className="mt-2 sm:mt-4 text-left text-sm sm:text-base text-neutral-200">
                {platformModules[0].description}
              </p>
              
            </div>
            
            {/* Chart visualization - Responsive & toggleable on mobile */}
            <div className={`${showFirstVisualization ? 'block mt-6' : 'hidden'} sm:block sm:mt-0 sm:absolute right-0 top-[50%] sm:transform sm:translate-y-[-50%] w-full sm:w-[250px] md:w-[300px] lg:w-[350px] h-[200px] sm:h-[200px] md:h-[250px] z-0 transition-all duration-300 ease-in-out lg:right-[-5%]`}>
              <div className="w-full h-full bg-white rounded-lg shadow-md p-2 sm:p-3 flex items-center justify-center">
                <div className="w-full h-full flex flex-col">
                  <div className="bg-gray-100 p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-600">
                    Growth Chart
                  </div>
                  <div className="flex-1 p-2 sm:p-3 flex flex-col justify-between">
                    <div className="w-full h-20 sm:h-24 bg-indigo-50 rounded mb-1 sm:mb-2 p-1 sm:p-2">
                      <div className="w-full h-full bg-indigo-600/10 rounded relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-full h-1/2 border-t border-indigo-600/30"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/3 border-t border-indigo-600/30"></div>
                        <div className="absolute bottom-0 left-0 w-full h-2/3 border-t border-indigo-600/30"></div>
                        <div className="absolute bottom-0 left-0 w-full h-5/6 border-t border-indigo-600/30"></div>
                        <svg viewBox="0 0 100 40" className="w-full h-full">
                          <polyline
                            points="0,35 20,30 40,25 60,20 80,15 100,10"
                            fill="none"
                            stroke="#4F46E5"
                            strokeWidth="1.5"
                          />
                          <circle cx="20" cy="30" r="2" fill="#4F46E5" />
                          <circle cx="40" cy="25" r="2" fill="#4F46E5" />
                          <circle cx="60" cy="20" r="2" fill="#4F46E5" />
                          <circle cx="80" cy="15" r="2" fill="#4F46E5" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div>12 mo</div>
                      <div>24 mo</div>
                      <div>36 mo</div>
                      <div>48 mo</div>
                    </div>
                    <button className="bg-indigo-600 text-white rounded py-1 px-2 sm:px-3 text-xs sm:text-sm mt-1 sm:mt-2">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </WobbleCard>
          
          {/* Growth Monitoring Card */}
          <WobbleCard 
            containerClassName="col-span-1 min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] bg-blue-700"
          >
            <h2 className="text-left text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
              {useCases[0].title}
            </h2>
            <p className="mt-2 sm:mt-4 text-left text-sm sm:text-base text-neutral-200">
              {useCases[0].description}
            </p>
          </WobbleCard>
          
          {/* Analytics Dashboard Card */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-3 bg-blue-500 min-h-[300px] md:min-h-[350px] lg:min-h-[350px] relative overflow-hidden"
            className="z-10"
          >
            <div className="max-w-full sm:max-w-xs md:max-w-sm relative z-10">
              <h2 className="text-left text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                {platformModules[1].title}
              </h2>
              <p className="mt-2 sm:mt-4 text-left text-sm sm:text-base text-neutral-200">
                {platformModules[1].description}
              </p>
              
              {/* Mobile-only toggle button */}
              
            </div>
            
            {/* Dashboard visualization - Responsive positioning and sizing */}
            <div className={`${showSecondVisualization ? 'block mt-6' : 'hidden'} sm:block sm:mt-0 sm:absolute right-0 sm:right-[5%] md:right-[10%] top-[50%] sm:transform sm:translate-y-[-50%] w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[220px] sm:h-[220px] md:h-[250px] z-0 transition-all duration-300 ease-in-out`}>
              <div className="w-full h-full bg-white rounded-lg shadow-md p-2 sm:p-3 flex items-center justify-center">
                <div className="w-full h-full flex flex-col">
                  <div className="bg-gray-100 p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-600">
                    Analysis Dashboard
                  </div>
                  <div className="flex-1 p-2 sm:p-3">
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <div className="bg-gray-50 p-1 sm:p-2 rounded text-xs">
                        <div className="font-medium text-gray-600 mb-1">Height</div>
                        <div className="text-indigo-600 font-medium">95cm (50th %ile)</div>
                      </div>
                      <div className="bg-gray-50 p-1 sm:p-2 rounded text-xs">
                        <div className="font-medium text-gray-600 mb-1">Weight</div>
                        <div className="text-indigo-600 font-medium">14kg (45th %ile)</div>
                      </div>
                      <div className="bg-gray-50 p-1 sm:p-2 rounded text-xs">
                        <div className="font-medium text-gray-600 mb-1">Head Circ.</div>
                        <div className="text-indigo-600 font-medium">48cm (55th %ile)</div>
                      </div>
                      <div className="bg-gray-50 p-1 sm:p-2 rounded text-xs">
                        <div className="font-medium text-gray-600 mb-1">BMI</div>
                        <div className="text-indigo-600 font-medium">15.5 (Normal)</div>
                      </div>
                    </div>
                    <div className="bg-indigo-50 rounded p-1 sm:p-2 text-xs text-center text-indigo-600 font-medium">
                      Growth Trends: Normal Development
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WobbleCard>
        </div>
      </div>
    </div>
  );
};

export default UseCasesAndModules;