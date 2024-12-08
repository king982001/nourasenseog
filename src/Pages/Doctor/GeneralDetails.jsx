import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { useUpdateDoctorGeneralDetails } from "src/Hooks/DoctorHooks.js";

export const GeneralDetails = () => {
  const [establishmentName, setEstablishmentName] = useState("");
  const [placeOfEstablishment, setPlaceOfEstablishment] = useState("");
  const [registrationCouncil, setRegistrationCouncil] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [gender, setGender] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutate: updateDetails } = useUpdateDoctorGeneralDetails();
  const navigate = useNavigate();
  const location = useLocation();
  const isFromSignUp = location.state?.fromSignup;
  const email = location.state?.email;
  const password = location.state?.password;

  // Redirect to signup if not from signup page
  useEffect(() => {
    if (!isFromSignUp || !email || !password) {
      navigate("/doctor/signup");
    }
  }, [isFromSignUp, email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting your details...");

    const formData = {
      establishment_name: establishmentName,
      place_of_establishment: placeOfEstablishment,
      registration_council: registrationCouncil,
      registration_number: registrationNumber,
      gender: gender?.value,
      name,
      surname,
      date_of_birth: dateOfBirth?.toISOString().split("T")[0],
      address,
      phonenumber: phoneNumber,
      email,
      password,
    };
    updateDetails(formData, {
      onSuccess: (response) => {
        toast.success("Successfully updated details...", { id: toastId });
        localStorage.setItem("DoctorToken", response.data.token);
        localStorage.setItem(
          "DoctorAccount",
          JSON.stringify(response.data.doctor),
        );
        navigate("/doctor/upload-id");
      },
    });
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="sm:min-h-screen flex flex-col justify-center items-center pt-8">
      <div className="w-full max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl text-neutral-700 font-bold text-center mb-4 font-serif">
          General Details
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Fill in the details below to create your account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={"flex justify-between space-x-4"}>
            <div>
              <label className="text-sm text-gray-600 font-semibold">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 font-semibold">
                Surname
              </label>
              <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className={"flex space-x-2 items-center"}>
            <label className="text-sm text-gray-600 font-semibold">
              Date of Birth
            </label>
            <DatePicker
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select your date of birth"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Gender
            </label>
            <Select
              options={genderOptions}
              value={gender}
              onChange={setGender}
              placeholder="Select Gender"
              className="w-full"
              classNamePrefix="react-select"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Establishment Name
            </label>
            <input
              type="text"
              placeholder="Establishment Name"
              value={establishmentName}
              onChange={(e) => setEstablishmentName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Place of Establishment
            </label>
            <input
              type="text"
              placeholder="Place of Establishment"
              value={placeOfEstablishment}
              onChange={(e) => setPlaceOfEstablishment(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Registration Council
            </label>
            <input
              type="text"
              placeholder="Registration Council"
              value={registrationCouncil}
              onChange={(e) => setRegistrationCouncil(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 font-semibold">
              Registration Number
            </label>
            <input
              type="text"
              placeholder="Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue-dark"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
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
    </div>
  );
};
