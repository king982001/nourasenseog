import React from 'react';

const UseCasesAndModules = () => {


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
                      <div className="w-full h-full flex flex-col">
                        <div className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-600">
                          Growth Charts
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div className="w-full h-24 bg-[#EBE9FF] rounded mb-2 p-2">
                            <div className="w-full h-full bg-[#4544DF]/10 rounded relative overflow-hidden">
                              <div className="absolute bottom-0 left-0 w-full h-1/2 border-t border-[#4544DF]/30"></div>
                              <div className="absolute bottom-0 left-0 w-full h-1/3 border-t border-[#4544DF]/30"></div>
                              <div className="absolute bottom-0 left-0 w-full h-2/3 border-t border-[#4544DF]/30"></div>
                              <div className="absolute bottom-0 left-0 w-full h-5/6 border-t border-[#4544DF]/30"></div>
                              <svg viewBox="0 0 100 40" className="w-full h-full">
                                <polyline
                                  points="0,35 20,30 40,25 60,20 80,15 100,10"
                                  fill="none"
                                  stroke="#4544DF"
                                  strokeWidth="1.5"
                                />
                                <circle cx="20" cy="30" r="2" fill="#4544DF" />
                                <circle cx="40" cy="25" r="2" fill="#4544DF" />
                                <circle cx="60" cy="20" r="2" fill="#4544DF" />
                                <circle cx="80" cy="15" r="2" fill="#4544DF" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <div>12 mo</div>
                            <div>24 mo</div>
                            <div>36 mo</div>
                            <div>48 mo</div>
                          </div>
                          <button className="bg-[#4544DF] text-white rounded py-1 px-3 text-sm mt-2">
                            Generate Report
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col">
                        <div className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-600">
                          Analytics Dashboard
                        </div>
                        <div className="flex-1 p-4">
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="bg-gray-50 p-2 rounded text-xs">
                              <div className="font-medium text-gray-600 mb-1">Height</div>
                              <div className="text-[#4544DF] font-medium">95cm (50th %ile)</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded text-xs">
                              <div className="font-medium text-gray-600 mb-1">Weight</div>
                              <div className="text-[#4544DF] font-medium">14kg (45th %ile)</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded text-xs">
                              <div className="font-medium text-gray-600 mb-1">Head Circ.</div>
                              <div className="text-[#4544DF] font-medium">48cm (55th %ile)</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded text-xs">
                              <div className="font-medium text-gray-600 mb-1">BMI</div>
                              <div className="text-[#4544DF] font-medium">15.5 (Normal)</div>
                            </div>
                          </div>
                          <div className="bg-[#EBE9FF] rounded p-2 text-xs text-center text-[#4544DF] font-medium">
                            Growth Trends: Normal Development
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <div className="inline-block bg-[#EBE9FF] text-[#4544DF] px-3 py-1 rounded-full text-sm font-medium mb-4">Module</div>
                  <h3 className="text-2xl font-medium mb-3">{module.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
                  <div>
                    <button 
                      className="inline-block px-6 py-3 border border-[#4544DF] text-[#4544DF] rounded-full font-medium hover:bg-[#4544DF] hover:text-white transition-colors duration-300"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCasesAndModules;