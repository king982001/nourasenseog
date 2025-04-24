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
    <div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800">Growth Charts</h2>
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col overflow-hidden">
        {/* Dropdown for small screens */}
        <div className="md:hidden mb-4">
          <select
            value={activeTab}
            onChange={handleDropdownChange}
            className="w-full px-3 py-2 text-sm font-light rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
            aria-label="Select growth chart"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tab buttons for larger screens */}
        <div className="hidden md:flex md:flex-wrap border-b border-gray-200 mb-5 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-4 py-2 md:py-3 text-sm font-light transition-colors whitespace-nowrap relative flex-shrink-0
                ${
                  activeTab === tab.id
                    ? "text-gray-800"
                    : "text-gray-500 hover:text-gray-700"
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
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-4 w-full flex-1 overflow-auto">
          <Chart indicator={activeTab} />
        </div>
      </div>
    </div>
  );
};
