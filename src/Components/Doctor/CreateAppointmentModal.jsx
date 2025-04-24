import { useState } from "react";
import Select from "react-select";
import { useCreateAppointment } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const CreateAppointmentModal = ({ patientData, closeModal }) => {
  const { patientId, patientName, patientSurname } = patientData;
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmPm] = useState("");
  const [description, setDescription] = useState("");
  const { mutate: createAppointment } = useCreateAppointment();

  const customStyles = {
    control: (base) => ({
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

  const hourOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString().padStart(2, "0"),
  }));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, "0"),
  }));

  const ampmOptions = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  const combineTime = () => {
    return `${hour}:${minute} ${ampm}`;
  };

  const handleAddAppointment = async () => {
    const combinedTime = combineTime();

    if (!date || !combinedTime.length || !description) {
      return toast.error("All fields are required");
    }
    if (!patientData) {
      return toast.error("Something went wrong!");
    }

    const appointmentData = {
      date,
      time: combinedTime,
      patientName,
      patientSurname,
      description,
    };

    await createAppointment(
      { appointmentData, patientId },
      {
        onMutate: () => {
          toast.loading("Please wait...");
        },
        onSuccess: () => {
          closeModal();
          toast.success("Appointment added successfully.");
        },
        onError: () => {
          toast.error("Error creating Appointment");
        },
      },
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md max-h-full">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-light text-gray-800">Add Appointment</h2>
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
          {/* Patient info */}
          <div className="mb-2">
            <span className="text-sm text-gray-500 font-light">
              Appointment for: <span className="text-gray-700">{patientName} {patientSurname}</span>
            </span>
          </div>
          
          {/* Date field */}
          <div>
            <label htmlFor="date" className="block text-sm text-gray-500 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm font-light"
            />
          </div>
          
          {/* Time field */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Time
            </label>
            <div className="grid grid-cols-3 gap-3">
              <Select
                options={hourOptions}
                value={hourOptions.find((option) => option.value === hour)}
                onChange={(selectedOption) => setHour(selectedOption.value)}
                placeholder="Hour"
                styles={customStyles}
                instanceId="hour-select"
                menuPlacement="auto"
              />
              <Select
                options={minuteOptions}
                value={minuteOptions.find((option) => option.value === minute)}
                onChange={(selectedOption) => setMinute(selectedOption.value)}
                placeholder="Minute"
                styles={customStyles}
                instanceId="minute-select"
                menuPlacement="auto"
              />
              <Select
                options={ampmOptions}
                value={ampmOptions.find((option) => option.value === ampm)}
                onChange={(selectedOption) => setAmPm(selectedOption.value)}
                placeholder="AM/PM"
                styles={customStyles}
                instanceId="ampm-select"
                menuPlacement="auto"
              />
            </div>
          </div>
          
          {/* Description field */}
          <div>
            <label htmlFor="description" className="block text-sm text-gray-500 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter appointment details"
              rows="3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-sm font-light resize-none"
            />
          </div>
        </div>
      </div>
      
      <div className="p-5 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleAddAppointment}
          className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-light transition-colors"
        >
          Schedule Appointment
        </motion.button>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;
