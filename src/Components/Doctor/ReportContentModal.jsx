import React, { useState } from 'react';

const ReportContentModal = ({ isOpen, onClose, reportData }) => {
  const [selectedSection, setSelectedSection] = useState('Prognosis');

  // Static data for demonstration
  const reportSections = {
    Prognosis: {
      content: "The patient's prognosis for recovery from influenza is favorable. Based on the current presentation and absence of high-risk factors, the following points outline the expected course of the illness:\n\nDuration of Symptoms:\nSymptoms typically last 5-7 days. The fever and body aches are expected to resolve within 3-4 days with adequate rest and hydration. Cough and fatigue may persist for up to 2 weeks.\n\nTreatment Plan:\nSymptom management through over-the-counter antipyretics (e.g., acetaminophen) and decongestants. Encouraged to maintain hydration and nutritional intake.\n\n*In severe cases, more medical scans are encouraged to uncover any underlying health conditions. Please visit your nearest doctor if symptoms persist for more than 14 days after taking the recommended medication."
    },
    Diagnosis: {
      content: "Primary diagnosis indicates acute upper respiratory infection with influenza-like symptoms..."
    },
    Treatment: {
      content: "Recommended treatment includes rest, hydration, and over-the-counter medications..."
    },
    Recommendations: {
      content: "Follow-up visit recommended in 2 weeks if symptoms persist..."
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center">Choose a Report Section</h2>
          <p className="text-center text-gray-600 mt-2">
            Choose a specific section of the report you would like to look at
          </p>
        </div>

        <div className="mb-6">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(reportSections).map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-2">
            *You are currently viewing the {selectedSection} section of the report.
          </p>
        </div>

        <div className="border border-gray-300 rounded-md p-4 mb-6 whitespace-pre-line">
          {reportSections[selectedSection].content}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#002f88] text-white py-3 rounded-md hover:bg-blue-700"
        >
          Close Report
        </button>
      </div>
    </div>
  );
};

export default ReportContentModal; 