import { useState } from "react";
import Chart from "src/Components/Doctor/Chart.jsx";
import { motion } from "motion/react";

export const GrowthCharts = () => {
  const [activeTab, setActiveTab] = useState("hfa");

  const tabs = [
    { id: "hfa", label: "Height for age" },
    { id: "wfa", label: "Weight for age" },
    { id: "wfh", label: "Weight for height" },
    { id: "bmi", label: "BMI for age" },
    { id: "hcfa", label: "Head circumference for age" },
  ];

  const handleDropdownChange = (event) => {
    setActiveTab(event.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl h-full flex flex-col border border-gray-100 transition-shadow duration-300">
      <div className="p-6 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 relative">Growth Charts</h2>
          <p className="text-sm text-gray-500 mt-1 relative">Track and analyze patient growth metrics</p>
        </motion.div>
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col overflow-hidden">
        {/* Dropdown for small screens */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <select
              value={activeTab}
              onChange={handleDropdownChange}
              className="w-full px-4 py-3 text-sm font-medium rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none"
              aria-label="Select growth chart"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tab buttons for larger screens */}
        <div className="hidden md:flex md:flex-wrap border-b border-gray-200 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap relative flex-shrink-0
                ${activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }
              `}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-4 w-full flex-1 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:border-blue-100 transition-colors duration-200">
            <Chart indicator={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};
