import React from 'react';
import { FileBarChart2, Calendar, Award } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: <FileBarChart2 size={24} />,
      title: "Growth monitoring",
      subtitle: "Evidence-based measurement tracking",
      description: "Guide parents and pediatricians to track child growth measurements accurately and consistently over time, using WHO and CDC validated standards.",
      stats: [
        { value: "98%", label: "clinical accuracy" },
        { value: "3x", label: "faster tracking" }
      ],
      mockUI: (
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-600">
            Growth Chart
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
      )
    },
    {
      icon: <Calendar size={24} />,
      title: "Pre-visit data collection",
      subtitle: "HIPAA-compliant appointment optimization",
      description: "Collect relevant growth data before telehealth or in-person consultations with secure, encrypted data transmission meeting healthcare standards.",
      stats: [
        { value: "40%", label: "less admin time" },
        { value: "2x", label: "appointment efficiency" }
      ],
      mockUI: (
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-600">
            Pre-Visit Dashboard
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
      )
    },
    {
      icon: <Award size={24} />,
      title: "Healthcare professional dashboard",
      subtitle: "Comprehensive clinical analysis",
      description: "Optimize growth analysis efficiency and decision-making for pediatricians with research-backed visualization tools and automated detection algorithms.",
      stats: [
        { value: "42%", label: "improved detection" },
        { value: "37%", label: "reduced documentation time" }
      ],
      mockUI: (
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-600">
            Clinical Analysis Dashboard
          </div>
          <div className="flex-1 p-4 flex flex-col space-y-3">
            <div className="flex space-x-2">
              <div className="bg-[#EBE9FF] rounded p-2 text-xs text-center flex-1 text-[#4544DF] font-medium">
                Height-for-age
              </div>
              <div className="bg-[#EBE9FF] rounded p-2 text-xs text-center flex-1 text-[#4544DF] font-medium">
                Weight-for-age
              </div>
            </div>
            <div className="bg-gray-50 rounded p-2 text-xs">
              <div className="font-medium text-gray-600 mb-1">Growth Velocity</div>
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#4544DF] rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span>Normal</span>
                <span className="font-medium">75th percentile</span>
              </div>
            </div>
            <div className="bg-[#EBE9FF] rounded p-2 text-xs text-center text-[#4544DF] font-medium">
              View Detailed Analysis
            </div>
          </div>
        </div>
      )
    }
  ];

  const certifications = [

  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#4544DF] font-medium mb-2 block">SOLUTIONS</span>
          <h2 className="text-3xl font-medium text-gray-900">Our use cases</h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            NouraSense provides comprehensive tools for child growth monitoring across healthcare settings, validated by leading pediatric institutions.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="mr-2">{cert.icon}</span>
                <span className="text-sm font-medium text-gray-800">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index} 
              className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="rounded-lg overflow-hidden mb-6 h-64 bg-[#EBE9FF] flex items-center justify-center p-4">
                <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden p-2 flex items-center justify-center max-w-xs mx-auto">
                  {useCase.mockUI}
                </div>
              </div>
              
              <div className="px-8 pb-8">
                <div className="inline-block bg-[#EBE9FF] text-[#4544DF] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Clinically Validated
                </div>
                <h3 className="text-2xl font-medium mb-2">{useCase.title}</h3>
                <h4 className="text-lg font-medium text-[#4544DF] mb-3">{useCase.subtitle}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{useCase.description}</p>
                
                {/* Stats section */}
                <div className="flex space-x-6 mb-6">
                  {useCase.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-[#4544DF]">{stat.value}</span>
                      <span className="text-sm text-gray-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <button 
                    className="inline-block px-6 py-3 border border-[#4544DF] text-[#4544DF] rounded-full font-medium hover:bg-[#4544DF] hover:text-white transition-colors duration-300"
                  >
                    View clinical evidence
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Credible testimonial */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#EBE9FF] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4544DF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <div>
              <blockquote className="text-gray-700 italic mb-2">
                "NouraSense has revolutionized how we monitor children's growth, giving us unprecedented accuracy and efficiency based on scientifically validated methodologies."
              </blockquote>
              <div className="font-medium">Dr. Sarah Johnson, MD, FAAP</div>
              <div className="text-sm text-gray-500">Chief of Pediatrics, Metro Children's Hospital</div>
              <div className="text-xs text-gray-400 mt-1">Based on a 12-month clinical implementation study with 2,500+ patients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;