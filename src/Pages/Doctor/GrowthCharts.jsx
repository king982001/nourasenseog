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
  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-center mb-8">Growth Charts</h1>
      <div className="w-full max-w-4xl bg-gray-100/90 p-2 rounded-lg flex flex-wrap justify-center sm:justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              w-full sm:w-auto py-3 px-4 text-sm sm:text-base font-medium rounded-md
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

      {/* Tab content can be added here */}
      <div className="mt-4 w-full">
        <Chart indicator={activeTab} />
      </div>
    </div>
  );
};
