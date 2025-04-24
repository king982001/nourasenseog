import { useState } from "react";
import Select from "react-select";
import {
  useAddPatient,
  useAddPatientByPatientId,
} from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const AddPatient = ({ closeModal, refetchPatients }) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("male");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [patientID, setPatientID] = useState("");
  const { mutate: addPatient } = useAddPatient();
  const { mutate: addPatientByPatientId } = useAddPatientByPatientId();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      minHeight: "40px",
      borderColor: "#e5e7eb",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#d1d5db"
      },
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: 300,
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
      fontWeight: 300
    }),
    input: (base) => ({
      ...base,
      fontWeight: 300
    }),
    menu: (base) => ({
      ...base,
      marginTop: "4px",
      borderRadius: "0.5rem",
      overflow: "hidden",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "200px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? "#f3f4f6" 
        : state.isFocused 
          ? "#f9fafb" 
          : "white",
      color: "#374151",
      fontWeight: state.isSelected ? 400 : 300,
      padding: "8px 12px",
      "&:active": {
        backgroundColor: "#f3f4f6"
      }
    }),
  };

  const dayOptions = [...Array(31).keys()].map((day) => ({
    value: day + 1,
    label: day + 1,
  }));

  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const yearOptions = Array.from(
    { length: new Date().getFullYear() - 1980 + 1 },
    (_, i) => ({ value: 1980 + i, label: 1980 + i }),
  );

  const handleAddPatient = async () => {
    if (patientID && patientID.length) {
      await addPatientByPatientId(patientID, {
        onMutate: () => {
          toast.loading("Please wait...");
        },
        onSuccess: () => {
          toast.success("Patient added successfully.");
          closeModal();
          refetchPatients();
        },
        onError: () => {
          toast.error("Unable to add patient");
        },
      });
      return;
    }

    // Validate fields before making the API call
    if (!firstName || !surname || !day || !month || !year) {
      toast.error("All fields are required!");
      return;
    }

    const patientData = {
      name: firstName,
      surname: surname,
      date_of_birth: `${year.value}/${month.value}/${day.value}`,
      gender: gender,
    };

    await addPatient(patientData, {
      onMutate: () => {
        toast.loading("Please wait...");
      },
      onSuccess: () => {
        toast.success("Patient added successfully.");
        closeModal();
        refetchPatients();
      },
      onError: (error) => {
        const errorMessage =
          error.response.data.message ?? "Unable to add patient";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md max-h-full">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-light text-gray-800">Add Patient</h2>
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={closeModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="space-y-5">
          {/* Name fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm text-gray-500 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm font-light"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm text-gray-500 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm font-light"
                placeholder="Enter last name"
              />
            </div>
          </div>
          
          {/* Gender selection */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Gender</label>
            <div className="flex space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-gray-500 border-gray-300 focus:ring-0"
                />
                <span className="ml-2 text-sm font-light text-gray-700">Male</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-gray-500 border-gray-300 focus:ring-0"
                />
                <span className="ml-2 text-sm font-light text-gray-700">Female</span>
              </label>
            </div>
          </div>
          
          {/* Date of birth fields */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Select
                  placeholder="Day"
                  options={dayOptions}
                  value={day}
                  onChange={(option) => setDay(option)}
                  styles={customStyles}
                  instanceId="day-select"
                />
              </div>
              <div>
                <Select
                  placeholder="Month"
                  options={monthOptions}
                  value={month}
                  onChange={(option) => setMonth(option)}
                  styles={customStyles}
                  instanceId="month-select"
                />
              </div>
              <div>
                <Select
                  placeholder="Year"
                  options={yearOptions}
                  value={year}
                  onChange={(option) => setYear(option)}
                  styles={customStyles}
                  instanceId="year-select"
                />
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-sm text-gray-400 font-light">OR</span>
            </div>
            <p className="text-center text-sm text-gray-400 font-light mt-2">
              Use patient ID if patient already has a profile
            </p>
          </div>
          
          {/* Patient ID field */}
          <div>
            <label htmlFor="patientID" className="block text-sm text-gray-500 mb-1">
              Patient ID
            </label>
            <input
              type="text"
              id="patientID"
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm font-light"
              placeholder="Enter patient ID"
            />
          </div>
        </div>
      </div>
      
      <div className="p-5 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleAddPatient}
          className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-light transition-colors"
        >
          Add Patient
        </motion.button>
      </div>
    </div>
  );
};

export default AddPatient;
