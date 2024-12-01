import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "src/Components/Footer.jsx";
import { useChildrens, useDiagnose } from "src/Hooks/PatientHooks.js";
import toast from "react-hot-toast";

const Diagnose = () => {
  const { id } = useParams();
  const { data, isLoading: loading, isError } = useChildrens();
  const patient = data?.data.find((patient) => patient._id === id);
  const { mutate: diagnose } = useDiagnose();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [error, setError] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false); // Loading state for diagnosis

  useEffect(() => {
    document.title = "Nourasense - Diagnose";
  }, []);

  const handleDiagnose = async () => {
    if (!patient) return toast.error("Oops! An error occurred.");
    if (!weight && !height && !headCircumference) {
      toast.error("Please enter at least one measurement to proceed.");
      return;
    }
    setError(null);
    const dobFormatted = new Date(patient.dataOfBirth).toLocaleDateString(
      "en-GB",
    );
    const data = {
      dob: dobFormatted,
      gender: patient.gender.charAt(0).toLowerCase(),
      id_num: id,
      height: parseFloat(height),
      weight: parseFloat(weight),
      head_circumference: parseFloat(headCircumference),
    };

    await diagnose(data, {
      onMutate: () => {
        setDiagnosisLoading(true); // Start loading for diagnosis
        toast.loading("Please wait!");
      },
      onSuccess: (response) => {
        setDiagnosisResult(response);
        setDiagnosisLoading(false); // Stop loading after diagnosis completes
      },
      onError: (error) => {
        setError("An error occurred during diagnosis.");
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

  if (loading) {
    return (
      <div className={"w-full h-full flex flex-col justify-center it"}>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full"></div>
            <p className="text-lg text-gray-700">Loading patient data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="w-[90%] max-w-6xl px-4 md:px-14 mt-8 py-4 mx-auto bg-white shadow-lg rounded-lg flex flex-col gap-8">
        {patient && (
          <>
            {/* Title */}
            <div className="text-center">
              <h1 className="font-serif text-xl md:text-2xl font-semibold text-gray-800">
                Enter Measurements for {patient.name} {patient.surname}
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                * Enter at least one anthropomorphic measurement to proceed
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

                {/* Zones */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Zones
                  </h3>
                  <ul className="space-y-3 pl-6">
                    {Object.entries(diagnosisResult.zones).map(
                      ([key, value]) => (
                        <li
                          key={key}
                          className="text-md md:text-lg space-x-2 text-gray-600"
                        >
                          <span className={`font-medium `}>
                            {key.replace(/_/g, " ").toUpperCase()}:
                          </span>
                          <span
                            className={`${getZoneStyle(value)} p-1 font-semibold rounded-sm  text-white`}
                          >
                            {value > 0 ? `+${value}` : value}
                          </span>
                        </li>
                      ),
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
                      ),
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
                      ),
                    )}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Diagnose;
