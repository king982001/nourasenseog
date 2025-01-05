import { useState } from "react";
import Chart from "src/Components/Doctor/Chart.jsx";

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
    <div className="w-full flex flex-col justify-center items-center px-4 py-6 bg-gray-50">
      <h1 className="font-serif text-xl font-semibold text-center mb-8">
        Growth Charts
      </h1>

      {/* Dropdown for small screens */}
      <div className="w-full sm:hidden mb-4">
        <select
          value={activeTab}
          onChange={handleDropdownChange}
          className="w-full py-3 px-4 text-sm font-medium rounded-md bg-gray-100 border border-gray-300 shadow-sm"
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
      <div className="hidden sm:flex w-full max-w-4xl bg-gray-100/90 p-2 rounded-lg flex-wrap justify-center sm:justify-between mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full sm:w-auto py-3 px-4 text-sm sm:text-base font-medium rounded-md
              transition-all duration-200 ease-in-out mb-2 sm:mb-0
              ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200/60"
              }
            `}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4 w-full">
        <Chart indicator={activeTab} />
      </div>
    </div>
  );
};
