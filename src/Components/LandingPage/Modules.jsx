"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";

const UseCasesAndModules = () => {
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
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#4544DF] font-medium mb-2 block">TECHNOLOGY</span>
          <h2 className="text-3xl font-medium text-gray-900">Platform modules</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">Our comprehensive suite of tools provides everything you need for effective child growth monitoring and analysis.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-[#4544DF] min-h-[500px] lg:min-h-[300px] relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMTUwdjE1MEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"
            className="z-10">
            <div className="max-w-xs relative z-10">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {platformModules[0].title}
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                {platformModules[0].description}
              </p>
            </div>
            
            <div className="absolute right-0 lg:right-[-10%] top-[50%] transform translate-y-[-50%] w-[300px] md:w-[400px] h-[250px] md:h-[300px] z-0">
              <div className="w-full h-full bg-white rounded-lg shadow-md p-3 flex items-center justify-center">
                <div className="w-full h-full flex flex-col">
                  <div className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-600">
                    Growth Chart
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
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
              </div>
            </div>
          </WobbleCard>
          
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[#1A68D3] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMTUwdjE1MEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              {useCases[0].title}
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              {useCases[0].description}
            </p>
          </WobbleCard>
          
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-3 bg-[#2D9AE9] min-h-[300px] md:min-h-[400px] lg:min-h-[350px] relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMTUwdjE1MEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"
            className="z-10">
            <div className="max-w-sm relative z-10">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {platformModules[1].title}
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                {platformModules[1].description}
              </p>
            </div>
            
            <div className="absolute right-0 lg:right-[10%] top-[50%] transform translate-y-[-50%] w-[300px] md:w-[400px] h-[250px] md:h-[300px] z-0">
              <div className="w-full h-full bg-white rounded-lg shadow-md p-3 flex items-center justify-center">
                <div className="w-full h-full flex flex-col">
                  <div className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-600">
                    Analysis Dashboard
                  </div>
                  <div className="flex-1 p-3">
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
              </div>
            </div>
          </WobbleCard>
        </div>
      </div>
    </div>
  );
};

export default UseCasesAndModules;