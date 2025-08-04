import React from 'react';

const WhoWeHelp = () => {
  const clientTypes = [
    {
      icon: (
        <div className="w-16 h-16 flex items-center justify-center bg-[#EBE9FF] rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z"></path>
            <path d="M12 8V16"></path>
            <path d="M16 12H8"></path>
          </svg>
        </div>
      ),
      title: "Health plans/insurers",
      description: "Enhance operations, reduce overutilization of services, improve member experience, cut costs, and engage rural populations.",
      tags: ["US", "IPMI", "DACH", "PMI"]
    },
    {
      icon: (
        <div className="w-16 h-16 flex items-center justify-center bg-[#EBE9FF] rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4544DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"></path>
            <path d="M9 22V12H15V22"></path>
          </svg>
        </div>
      ),
      title: "Public health/government",
      description: "Optimize services, enhance patient satisfaction, gather health data, and improve care navigation.",
      hasLearnMore: true
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900">Who we help</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clientTypes.map((client, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              <div className="mb-6 flex justify-start">
                {client.icon}
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">{client.title}</h3>
              <p className="text-gray-600 mb-8">{client.description}</p>
              
              {client.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {client.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-4 py-2 text-sm border border-[#4544DF] text-[#4544DF] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {client.hasLearnMore && (
                <button 
                  className="px-4 py-2 border border-[#4544DF] text-[#4544DF] rounded-full hover:bg-[#4544DF] hover:text-white transition-colors duration-300"
                >
                  Learn more
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;