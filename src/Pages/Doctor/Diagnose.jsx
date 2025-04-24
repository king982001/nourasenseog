import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDiagnose,
  usePatientById,
  useReport,
} from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import BackButton from "src/Components/BackButton.jsx";

const Diagnose = () => {
  const { id } = useParams();
  const { data: patient, isLoading: loading, isError } = usePatientById(id);
  const { mutate: diagnose } = useDiagnose();
  const { mutate: generateReport } = useReport();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [error, setError] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [reportLink, setReportLink] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const account = JSON.parse(localStorage.getItem("DoctorAccount"));
  const doctorName = account?.name?.trim() || "";
  const surName = account?.surname?.trim() || "";
  const location = useLocation();
  const navigate = useNavigate();
  const isApproved = location.state?.isApproved;
  const dobFormatted = new Date(patient?.date_of_birth).toLocaleDateString(
    "en-GB"
  );

  useEffect(() => {
    document.title = "Nourasense - Diagnose";
  }, []);

  useEffect(() => {
    if (!isApproved) {
      navigate("/doctor/");
    }
  }, [isApproved, navigate]);

  const handleDiagnose = async () => {
    if (!patient) return toast.error("Oops! An error occurred.");

    // Validate input ranges
    if (weight && (weight < 1 || weight > 125)) {
      return toast.error("Weight must be between 1 and 125 kg.");
    }
    if (height && (height < 10 || height > 200)) {
      return toast.error("Height must be between 10 and 200 cm.");
    }
    if (
      headCircumference &&
      (headCircumference < 10 || headCircumference > 150)
    ) {
      return toast.error("Head circumference must be between 10 and 150 cm.");
    }

    if (!weight && !height && !headCircumference) {
      toast.error("Please enter at least one measurement to proceed.");
      return;
    }
    const toastId = toast.loading("Please wait...");
    setError(null);
    const data = {
      dob: dobFormatted,
      gender: patient.gender.charAt(0).toLowerCase(),
      height: parseFloat(height),
      child_id: patient?.customId,
      user_id: account?.customId,
      weight: parseFloat(weight),
      head_circumference: parseFloat(headCircumference),
    };

    await diagnose(data, {
      onMutate: () => {
        setDiagnosisLoading(true);
      },
      onSuccess: (response) => {
        setDiagnosisResult(response);
        toast.success("Diagnose successfully", { id: toastId });
        setDiagnosisLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setError(`An error occurred during diagnosis`);
        toast.error("An error occurred during diagnosis.", { id: toastId });
        setDiagnosisLoading(false);
      },
    });
  };

  const getZoneStyle = (zone) => {
    switch (zone) {
      case 0:
      case 3:
      case -3:
        return "bg-green-500";
      case 5:
      case -5:
        return "bg-yellow-500";
      case 6:
      case -6:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleGenerateReport = async () => {
    if (!diagnosisResult) return toast.error("Oops! An error occurred.");
    setReportLoading(true);
    const toastId = toast.loading("Please wait...");
    const account = JSON.parse(localStorage.getItem("DoctorAccount"));
    const dob = new Date(patient?.date_of_birth);
    const dobFormatted = `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, "0")}-${String(dob.getDate()).padStart(2, "0")}`;

    // Extract the required data from the diagnosis result
    const reportData = {
      user_id: account.customId,
      client_details:
        account.registration?.establishment_name || "Unknown Hospital",
      doctor_name: `Dr. ${account.name} ${account.surname}`,
      dob: dobFormatted || "",
      doctor_id: account.customId,
      contact: account.phonenumber || "",
      patient_id: patient?.customId,
      name: `${patient.name} ${patient.surname}`,
      gender: patient.gender,
      date: diagnosisResult.date,
      zones: diagnosisResult.zones,
      measurements: diagnosisResult.measurements,
      diagnoses: diagnosisResult.diagnoses,
      zscores: diagnosisResult.zscores,
    };

    await generateReport(reportData, {
      onMutate: () => {
        setReportLoading(true);
      },
      onSuccess: (response) => {
        toast.success("Report generated successfully.", { id: toastId });
        setReportLink(response.report_link);
        setReportLoading(false);
      },
      onError: (error) => {
        console.error("Error generating report:", error);
        toast.error("An error occurred.", { id: toastId });
        setReportLoading(false);
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin w-10 h-10 border-4 border-t-transparent border-primary-blue rounded-full"></div>
          <p className="text-gray-600 font-light">Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4">
        
        
        {/* Header Section */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-light text-gray-800">
            Hello, Dr. <span className="text-primary-blue font-normal">{doctorName} {surName}</span>
          </h1>
          <p className="text-gray-600 mt-1 font-light">
            Let's diagnose {patient?.name} {patient?.surname}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Input Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-light text-gray-800 mb-4 text-center">
              Enter Measurements
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6 font-light">
              Enter at least one anthropometric measurement to proceed
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Weight */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-light" htmlFor="weight">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  name="weight"
                  id="weight"
                  placeholder="Enter weight in kg"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-primary-blue font-light"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              {/* Height */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600 font-light" htmlFor="height">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  name="height"
                  id="height"
                  placeholder="Enter height in cm"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-primary-blue font-light"
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              {/* Head Circumference */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-gray-600 font-light" htmlFor="headCircumference">
                  Head Circumference (cm)
                </label>
                <input
                  type="number"
                  value={headCircumference}
                  name="headCircumference"
                  id="headCircumference"
                  placeholder="Enter head circumference in cm"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-primary-blue font-light"
                  onChange={(e) => setHeadCircumference(e.target.value)}
                />
              </div>
            </div>

            {/* Diagnose Button */}
            <div className="mt-6">
              <button
                className="bg-primary-blue text-white w-full py-3 rounded-lg font-light hover:bg-blue-600 transition-colors"
                onClick={handleDiagnose}
                disabled={diagnosisLoading}
              >
                {diagnosisLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                    <span>Diagnosing...</span>
                  </div>
                ) : (
                  "Diagnose"
                )}
              </button>
              {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
            </div>
          </div>

          {/* Results Card */}
          {diagnosisResult && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-light text-gray-800 mb-5 text-center">
                Diagnosis Results
              </h2>

              <div className="space-y-8">
                {/* Z-scores */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-md font-normal text-gray-700 mb-4">
                    Z-scores
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(diagnosisResult.zscores).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`${getZoneStyle(diagnosisResult.zones[key])} h-3 w-3 rounded-full flex-shrink-0`}
                          ></span>
                          <span className="text-gray-600 font-light text-sm whitespace-nowrap">
                            {key.replace(/_/g, " ").toUpperCase()}:
                          </span>
                          <span className="bg-white py-1 px-3 rounded-full text-sm font-normal ml-auto">
                            {value > 0 ? `+${value}` : value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Measurements & Diagnoses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Measurements */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-md font-normal text-gray-700 mb-4">
                      Measurements
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(diagnosisResult.measurements).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-600 font-light text-sm">
                              {key.replace(/_/g, " ").toUpperCase()}:
                            </span>
                            <span className="font-normal text-sm">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Diagnoses */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-md font-normal text-gray-700 mb-4">
                      Diagnoses
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(diagnosisResult.diagnoses).map(
                        ([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-gray-600 font-light text-sm">
                              {key.replace(/_/g, " ").toUpperCase()}:
                            </span>
                            <span className="font-normal text-sm mt-1">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Generate Report Button */}
                <button
                  className="bg-primary-blue text-white w-full py-3 rounded-lg font-light hover:bg-blue-600 transition-colors"
                  onClick={handleGenerateReport}
                  disabled={reportLoading}
                  id={"diagnosisBtn"}
                >
                  {reportLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                      <span>Generating Report...</span>
                    </div>
                  ) : (
                    "Generate Report"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Report Download */}
          {reportLink && (
            <div className="mt-5">
              <a
                href={reportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white w-full py-3 rounded-lg flex justify-center items-center font-light hover:bg-green-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Report
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnose;
