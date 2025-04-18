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
  const [diagnosisLoading, setDiagnosisLoading] = useState(false); // Loading state for diagnosis
  const [reportLoading, setReportLoading] = useState(false); // Loading state for report generation
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
        setDiagnosisLoading(true); // Start loading for diagnosis
      },
      onSuccess: (response) => {
        setDiagnosisResult(response);
        toast.success("Diagnose successfully", { id: toastId });
        setDiagnosisLoading(false); // Stop loading after diagnosis completes
      },
      onError: (error) => {
        console.log(error);

        setError(`An error occurred during diagnosis`);
        toast.error("An error occurred during diagnosis.", { id: toastId });
        setDiagnosisLoading(false); // Stop loading on error
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
        return "bg-yellow-500"; // Use amber or orange for variation if needed
      case 6:
      case -6:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleGenerateReport = async () => {
    if (!diagnosisResult) return toast.error("Oops! An error occurred.");
    setReportLoading(true); // Start loading for report generation
    const toastId = toast.loading("Please wait...");
    const account = JSON.parse(localStorage.getItem("DoctorAccount"));
    const dob = new Date(patient?.date_of_birth);
    const dobFormatted = `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, "0")}-${String(dob.getDate()).padStart(2, "0")}`;

    // Extract the required data from the diagnosis result
    const reportData = {
      user_id: account.customId,
      client_details:
        account.registration?.establishment_name || "Unknown Hospital", // Client details (hospital name)
      doctor_name: `Dr. ${account.name} ${account.surname}`, // Doctor's full name
      dob: dobFormatted || "", // Report date (already in diagnosisResult)
      doctor_id: account.customId, // Doctor ID (from account's customId)
      contact: account.phonenumber || "", // Doctor's contact (from account's phonenumber)
      patient_id: patient?.customId, // Patient ID (from patient data)
      name: `${patient.name} ${patient.surname}`, // Patient's full name
      gender: patient.gender,
      date: diagnosisResult.date, // Report date
      zones: diagnosisResult.zones, // Zones data
      measurements: diagnosisResult.measurements, // Measurements data
      diagnoses: diagnosisResult.diagnoses, // Diagnoses data
      zscores: diagnosisResult.zscores,
    };

    await generateReport(reportData, {
      onMutate: () => {
        setReportLoading(true);
      },
      onSuccess: (response) => {
        toast.success("Report generated successfully.", { id: toastId });
        setReportLink(response.report_link); // Store the report download link
        setReportLoading(false); // Stop loading after report generation
      },
      onError: (error) => {
        console.error("Error generating report:", error);
        toast.error("An error occurred.", { id: toastId });
        setReportLoading(false); // Stop loading on error
      },
    });
  };

  if (loading) {
    return (
      <div className={"w-full h-full"}>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full"></div>
            <p className="text-lg text-gray-700">Loading patient data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <div className="flex flex-col gap-2 text-center pt-16 pb-4 md:pt-12 md:pb-8 px-8 md:px-12">
        <h1 className="font-serif text-xl md:text-2xl font-semibold text-gray-800">
          Hello{" "}
          <span className="text-primary-blue">
            Dr. {doctorName} {surName}
          </span>
        </h1>
        <p className="text-base sm:text-lg">
          Let`s diagnose {`${patient.name} ${patient.surname}`}
        </p>
      </div>
      <div className="w-[90%] max-w-6xl px-4 md:px-14 mt-8 py-4 mx-auto bg-white shadow-lg rounded-lg flex flex-col gap-8">
        {patient && (
          <>
            {/* Title */}
            <div className="text-center">
              <h1 className="font-serif text-xl md:text-2xl font-semibold text-gray-800">
                Enter Measurements for {patient.name} {patient.surname}
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                * Enter at least one anthropometric measurement to proceed
              </p>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight */}
              <div className="input flex flex-col gap-y-1">
                <label
                  className="pl-2 text-sm font-medium text-gray-700"
                  htmlFor="weight"
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  name="weight"
                  id="weight"
                  placeholder="Enter weight in kilograms"
                  className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              {/* Height */}
              <div className="input flex flex-col gap-y-1">
                <label
                  className="pl-2 text-sm font-medium text-gray-700"
                  htmlFor="height"
                >
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  name="height"
                  id="height"
                  placeholder="Enter height in centimeters"
                  className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              {/* Head Circumference */}
              <div className="input flex flex-col md:col-span-2 gap-y-1">
                <label
                  className="pl-2 text-sm font-medium text-gray-700"
                  htmlFor="headCircumference"
                >
                  Head Circumference (cm)
                </label>
                <input
                  type="number"
                  value={headCircumference}
                  name="headCircumference"
                  id="headCircumference"
                  placeholder="Enter head circumference in centimeters"
                  className="w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  onChange={(e) => setHeadCircumference(e.target.value)}
                />
              </div>
            </div>

            {/* Diagnose Button */}
            <div className="mt-4">
              <button
                className="bg-primary-blue text-white w-full py-4 rounded-md font-medium hover:bg-primary-blue-light transition"
                onClick={handleDiagnose}
                disabled={diagnosisLoading}
              >
                {diagnosisLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                    Diagnosing...
                  </div>
                ) : (
                  "Diagnose"
                )}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            {/* Diagnosis Results */}
            {diagnosisResult && (
              <div className="bg-gray-100 p-6 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Diagnosis Result
                </h2>

                {/* Z-scores */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Z-scores
                  </h3>
                  <ul className="space-y-3 pl-6">
                    {Object.entries(diagnosisResult.zscores).map(
                      ([key, value]) => (
                        <li
                          key={key}
                          className="text-sm sm:text-md flex items-center md:text-lg space-x-2 sm:space-x-5 text-gray-600"
                        >
                          <span
                            className={`${getZoneStyle(diagnosisResult.zones[key])} h-2 w-2 rounded-full shadow drop-shadow-sm`}
                          ></span>
                          <span className={`font-medium `}>
                            {key.replace(/_/g, " ").toUpperCase()}:
                          </span>
                          <span
                            className={` h-8 w-8 flex items-center justify-center font-semibold rounded-[50%]  `}
                          >
                            <p>{value > 0 ? `+${value}` : value}</p>
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Measurements */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Measurements
                  </h3>
                  <ul className=" space-y-2 pl-6">
                    {Object.entries(diagnosisResult.measurements).map(
                      ([key, value]) => (
                        <li
                          key={key}
                          className="text-md md:text-lg text-gray-600"
                        >
                          <span className="font-medium">
                            {key.replace(/_/g, " ").toUpperCase()}:
                          </span>{" "}
                          {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Diagnoses */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Diagnoses
                  </h3>
                  <ul className="space-y-2 pl-6">
                    {Object.entries(diagnosisResult.diagnoses).map(
                      ([key, value]) => (
                        <li
                          key={key}
                          className="text-md md:text-lg  text-gray-600"
                        >
                          <span className="font-medium">
                            {key.replace(/_/g, " ").toUpperCase()}:
                          </span>{" "}
                          {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Generate Report Button */}
                <button
                  className="bg-primary-blue text-white w-full py-4 rounded-md font-medium hover:bg-primary-blue-light transition"
                  onClick={handleGenerateReport}
                  disabled={reportLoading}
                  id={"diagnosisBtn"}
                >
                  {reportLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                      Generating Report...
                    </div>
                  ) : (
                    "Generate Report"
                  )}
                </button>
              </div>
            )}

            {/* Report Download */}
            {reportLink && (
              <div className="mt-4">
                <a
                  href={reportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white w-full py-3 rounded-md flex justify-center items-center font-medium hover:bg-green-400 transition"
                >
                  Download Report
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Diagnose;
