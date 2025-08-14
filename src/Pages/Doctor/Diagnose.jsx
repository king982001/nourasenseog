import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDiagnose,
  usePatientById,
  useReport,
} from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { FiActivity, FiArrowLeft, FiFileText, FiMaximize,  FiUser } from "react-icons/fi";

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      <p className="mt-4 text-gray-600 font-light">Loading patient data...</p>
    </div>
  </div>
);

// Error state component
const ErrorState = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-screen p-4">
    <div className="text-red-500 mb-4">
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h2 className="text-2xl font-light mb-2">Something Went Wrong</h2>
    <p className="text-gray-600 max-w-md text-center">
      {message || "We encountered an issue while loading patient data. Please try again."}
    </p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-6 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Refresh Page
    </button>
  </div>
);

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
    document.title = "Nourasense - Patient Diagnosis";
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
    const toastId = toast.loading("Processing diagnosis...");
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
        toast.success("Diagnosis completed successfully!", { id: toastId });
        setDiagnosisLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setError(`An error occurred during diagnosis`);
        toast.error("Diagnosis failed. Please try again.", { id: toastId });
        setDiagnosisLoading(false);
      },
    });
  };

  const getZoneStyle = (zone) => {
    switch (zone) {
      case 0:
      case 3:
      case -3:
        return "bg-green-500 text-white";
      case 5:
      case -5:
        return "bg-yellow-500 text-white";
      case 6:
      case -6:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getZoneIcon = (zone) => {
    switch (zone) {
      case 0:
      case 3:
      case -3:
        return <FiActivity className="h-4 w-4" />;
      case 5:
      case -5:
        return <FiActivity className="h-4 w-4" />;
      case 6:
      case -6:
        return <FiActivity className="h-4 w-4" />;
      default:
        return <FiActivity className="h-4 w-4" />;
    }
  };

  const handleGenerateReport = async () => {
    if (!diagnosisResult) return toast.error("Oops! An error occurred.");
    setReportLoading(true);
    const toastId = toast.loading("Generating report...");
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
        toast.success("Report generated successfully!", { id: toastId });
        setReportLink(response.report_link);
        setReportLoading(false);
      },
      onError: (error) => {
        console.error("Error generating report:", error);
        toast.error("Report generation failed. Please try again.", { id: toastId });
        setReportLoading(false);
      },
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* Back button */}
        <button 
          onClick={() => navigate("/doctor/")}
          className="flex items-center text-gray-600 hover:text-primary-blue mb-6"
        >
          <FiArrowLeft className="mr-2" />
          <span>Back to Dashboard</span>
        </button>
        
        {/* Header Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-2">
            <div className="bg-primary-blue bg-opacity-10 p-3 rounded-full text-primary-blue mr-2">
              <FiUser className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-light text-gray-800">
              Diagnose: <span className="text-primary-blue">{patient?.name} {patient?.surname}</span>
            </h1>
          </div>
          <p className="text-gray-500 font-light">
            Dr. {doctorName} {surName} • {patient?.gender} • Born: {dobFormatted}
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Input Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-light text-gray-800">
                Anthropometric Measurements
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Enter at least one measurement to generate diagnosis
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Weight */}
                <div className="space-y-2">
                  <label className="block text-sm font-light text-gray-600">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <FiActivity className="h-5 w-5" />
                    </div>
                    <input
                      type="number"
                      value={weight}
                      placeholder="Enter weight in kilograms"
                      className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 p-3"
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <label className="block text-sm font-light text-gray-600">
                    Height (cm)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      {/* <FiRuler className="h-5 w-5" /> */}
                    </div>
                    <input
                      type="number"
                      value={height}
                      placeholder="Enter height in centimeters"
                      className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 p-3"
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>

                {/* Head Circumference */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-light text-gray-600">
                    Head Circumference (cm)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <FiMaximize className="h-5 w-5" />
                    </div>
                    <input
                      type="number"
                      value={headCircumference}
                      placeholder="Enter head circumference in centimeters"
                      className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full pl-10 p-3"
                      onChange={(e) => setHeadCircumference(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Diagnose Button */}
              <button
                className="w-full py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleDiagnose}
                disabled={diagnosisLoading}
              >
                {diagnosisLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing Diagnosis...</span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <FiFileText className="h-5 w-5" />
                    <span>Generate Diagnosis</span>
                  </div>
                )}
              </button>
              {error && <p className="text-red-500 mt-3 text-center text-sm">{error}</p>}
            </div>
          </motion.div>

          {/* Results Card */}
          {diagnosisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-light text-gray-800 flex items-center">
                  <FiFileText className="mr-2 text-primary-blue" />
                  Diagnosis Results
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Assessment based on provided measurements
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Z-scores */}
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                    <h3 className="text-lg font-light text-gray-800 mb-4 pb-2 border-b border-gray-100">
                      Z-scores
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(diagnosisResult.zscores).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center gap-3"
                          >
                            <div className={`${getZoneStyle(diagnosisResult.zones[key])} p-2 rounded-lg flex items-center justify-center`}>
                              {getZoneIcon(diagnosisResult.zones[key])}
                            </div>
                            <span className="text-gray-700 font-light">
                              {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <span className="bg-white py-1 px-3 rounded-full text-sm font-medium ml-auto shadow-sm">
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
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                      <h3 className="text-lg font-light text-gray-800 mb-4 pb-2 border-b border-gray-100">
                        Measurements
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(diagnosisResult.measurements).map(
                          ([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-gray-700 font-light">
                                {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                              <span className="font-medium">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Diagnoses */}
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                      <h3 className="text-lg font-light text-gray-800 mb-4 pb-2 border-b border-gray-100">
                        Diagnoses
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(diagnosisResult.diagnoses).map(
                          ([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <span className="text-gray-700 font-medium">
                                {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                              <span className="text-gray-600 mt-1">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Diagnose;
