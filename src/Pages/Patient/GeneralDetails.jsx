import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSaveGeneralDetails } from "src/Hooks/PatientHooks";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const GeneralDetails = () => {
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate: saveDetails } = useSaveGeneralDetails();
  const navigate = useNavigate();
  const location = useLocation();
  const isFromSignUp = location.state?.fromSignUp;

  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

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
      {
        gender: gender?.value,
        dateOfBirth: dateOfBirth?.toISOString().split("T")[0],
        name,
        surname,
        phoneNumber,
      },
      {
        onSuccess: (response) => {
          toast.success("General details saved successfully!", { id: toastId });
          localStorage.setItem("account", JSON.stringify(response.data.parent));
          navigate("/dashboard");
        },
        onError: () => {
          toast.error("Failed to save details. Please try again.", {
            id: toastId,
          });
          setLoading(false);
        },
      },
    );
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="sm:min-h-screen flex flex-col justify-center items-center">
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
          <div className={"flex flex-col"}>
            <label htmlFor="date-of-birth" className="text-sm text-gray-600">
              Date of Birth
            </label>
            <DatePicker
              id="date-of-birth"
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select your date of birth"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-sm text-gray-600">
              Gender
            </label>
            <Select
              id="gender"
              options={genderOptions}
              value={gender}
              onChange={setGender}
              placeholder="Select Gender"
              className="w-full active:ring-primary-blue"
              classNamePrefix="react-select"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue-dark"
          >
            {loading ? "Saving..." : "Save Details"}
          </button>
        </form>

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
