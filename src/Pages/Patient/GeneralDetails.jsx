import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSaveGeneralDetails } from "src/Hooks/PatientHooks"; // Replace with the appropriate hook for saving general details

const GeneralDetails = () => {
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate: saveDetails } = useSaveGeneralDetails();
  const navigate = useNavigate();
  const location = useLocation();
  // Check if the user is coming from the signup page
  const isFromSignUp = location.state?.fromSignUp;

  // Redirect to signup if not from signup page
  useEffect(() => {
    if (!isFromSignUp) {
      navigate("/signup");
    }
  }, [isFromSignUp, navigate]);

  const handleSaveDetails = (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Saving your details...");

    saveDetails(
      { gender, dateOfBirth, name, surname, phoneNumber },
      {
        onSuccess: (response) => {
          toast.success("General details saved successfully!", { id: toastId });
          console.log(response);
          localStorage.setItem("account", JSON.stringify(response.data.parent));
          navigate("/dashboard"); // Adjust this to the next page after saving details
        },
        onError: (error) => {
          toast.error("Failed to save details. Please try again.", {
            id: toastId,
          });
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg drop-shadow-lg">
        <h2 className="text-2xl md:text-3xl text-neutral-700 font-bold text-center mb-4">
          Provide Your General Details
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please fill in the details below to continue.
        </p>
        <form onSubmit={handleSaveDetails} className="space-y-4">
          <div>
            <label htmlFor="first-name" className="text-sm text-gray-600">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label htmlFor="surname" className="text-sm text-gray-600">
              Surname
            </label>
            <input
              id="surname"
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label htmlFor="phone-number" className="text-sm text-gray-600">
              Phone Number
            </label>
            <input
              id="phone-number"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label htmlFor="date-of-birth" className="text-sm text-gray-600">
              Date of Birth
            </label>
            <input
              id="date-of-birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-sm text-gray-600">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue-dark"
          >
            {loading ? "Saving..." : "Save Details"}
          </button>
        </form>

        <div className="relative flex justify-center items-center mt-6">
          <span className="absolute bg-white px-4 text-gray-500">OR</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <p className="text-sm text-center text-gray-600 mt-4">
          By submitting, you agree to our{" "}
          <Link to="/terms" className="text-primary-blue hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary-blue hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className="mt-6 text-xs text-gray-500">
        <p className="text-center md:text-left">
          &copy; 2024 Nourasense. All rights reserved.{" "}
          <Link
            to="/privacy-policy"
            className="text-primary-blue hover:underline"
          >
            Privacy Policy
          </Link>
          {" | "}
          <Link to="/t&c" className="text-primary-blue hover:underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
};

export default GeneralDetails;
