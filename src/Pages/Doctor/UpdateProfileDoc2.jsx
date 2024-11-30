import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateMedicalVerification } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const UpdateProfileDoc2 = () => {
  const [regnoValue, setRegnoValue] = useState("");
  const [establishmentName, setEstablishmentName] = useState("");
  const [placeOfEstablishment, setPlaceOfEstablishment] = useState("");
  const [regCouncil, setRegCouncil] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { mutate: updateMedicalDetails } = useUpdateMedicalVerification();

  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();

    // Gather the form data
    const verificationData = {
      establishment_name: establishmentName,
      place_of_establishment: placeOfEstablishment,
      registration_number: regnoValue,
      registration_council: regCouncil,
    };

    try {
      setLoading(true);
      setErrorMessage(""); // Clear any previous error message
      // Call the API to update medical verification
      await updateMedicalDetails(verificationData, {
        onSuccess: () => {
          navigate("/doctor/UpdateProfileDoc3");
        },
        onError: () => {
          toast.error("Error updating details");
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        "Failed to update verification details. Please try again.",
      );
    }
  };

  const handleregnoChange = (e) => {
    const newValue = e.target.value;
    // Ensure numeric only input for regnoValue
    if (/^[0-9]*$/.test(newValue)) {
      setRegnoValue(newValue);
    }
  };

  const handleTextInputChange = (setter) => (e) => {
    const newValue = e.target.value;
    // Ensure only letters and spaces are allowed
    if (/^[A-Za-z\s]*$/.test(newValue)) {
      setter(newValue);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-8">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Verify Your Identity
        </h2>
        <p className="text-lg text-center mb-6 text-gray-600">
          Enter your registration details as accurately as possible. These are
          required to verify your account as a registered medical professional.
        </p>
        <form id="signup-form" onSubmit={handleNext}>
          {/* Establishment Name */}
          <div className="mb-6">
            <input
              type="text"
              id="estname"
              name="estname"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              placeholder="Establishment Name"
              value={establishmentName}
              onChange={handleTextInputChange(setEstablishmentName)}
              minLength="3"
              required
            />
          </div>

          {/* Place of Establishment */}
          <div className="mb-6">
            <input
              type="text"
              id="place"
              name="place"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              placeholder="Place of Establishment"
              value={placeOfEstablishment}
              onChange={handleTextInputChange(setPlaceOfEstablishment)}
              minLength="3"
              required
            />
          </div>

          {/* Registration Number */}
          <div className="mb-6">
            <input
              type="number"
              id="regno"
              name="regno"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              placeholder="Registration Number"
              min="0"
              value={regnoValue}
              onChange={handleregnoChange}
              required
            />
          </div>

          {/* Registration Council */}
          <div className="mb-8">
            <input
              type="text"
              id="regcoun"
              name="regcoun"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              placeholder="Registration Council"
              value={regCouncil}
              onChange={handleTextInputChange(setRegCouncil)}
              minLength="3"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-center mb-6">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-primary-blue text-white font-semibold rounded-md hover:bg-primary-blue-dark disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDoc2;
