import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateGeneralDetails } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const UpdateProfileDoc = () => {
  const navigate = useNavigate();
  const { mutate: updateGeneralDetails } = useUpdateGeneralDetails();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    date_of_birth: "",
    gender: "",
    address: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  // Validation patterns
  const namePattern = /^[A-Za-z]*$/; // Only letters
  const numericPattern = /^[0-9]*$/; // Only numbers
  const validateAddress = (address) => address.length > 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" || name === "surname") {
      if (namePattern.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (["dobDay", "dobMonth", "dobYear"].includes(name)) {
      if (numericPattern.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (numericPattern.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    // Final Validation checks
    if (!validateAddress(formData.address)) {
      return setError("Address must be at least 6 characters long.");
    }

    try {
      const data = { ...formData, phonenumber: phoneNumber };
      await updateGeneralDetails(data, {
        onSuccess: (response) => {
          console.log(response);
          toast.success("Details Updated!");
          localStorage.setItem(
            "DoctorAccount",
            JSON.stringify(response?.data.data.doctor),
          );
          navigate("/doctor/updateProfileDoc2");
        },
        onError: (error) => {
          toast.error("Error updating details!");
        },
      });
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center py-8">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Update Profile
        </h2>

        {error && <p className="text-red-600 text-center mb-6">{error}</p>}

        <form onSubmit={handleNext}>
          {/* Name Inputs */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600">
              Legal Name
            </label>
            <div className="flex space-x-6 mt-1">
              <input
                type="text"
                name="name"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                placeholder="First Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="surname"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              className="w-full mt-1 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600">
              Gender
            </label>
            <div className="flex space-x-6 mt-1">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInputChange}
                  required
                />{" "}
                Male
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInputChange}
                  required
                />{" "}
                Female
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={handleInputChange}
                  required
                />{" "}
                Other
              </label>
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <input
              type="tel"
              name="phone"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              maxLength="10"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-8">
            <input
              type="text"
              name="address"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-primary-blue text-white font-semibold rounded-md hover:bg-primary-blue-dark disabled:opacity-50"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDoc;
