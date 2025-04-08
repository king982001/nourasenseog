import { useState } from "react";
import Select from "react-select";
import { useCreateAppointment } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const CreateAppointmentModal = ({ patientData, closeModal }) => {
  const { patientId, patientName, patientSurname } = patientData;
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmPm] = useState("");
  const [description, setDescription] = useState("");
  const { mutate: createAppointment } = useCreateAppointment();

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
    <div className="pop-up px-12 bg-white py-4 mx-auto rounded-lg flex flex-col gap-4">
      <h1 className="font-serif text-xl font-semibold text-center">
        Add Appointment
      </h1>
      <div className="flex flex-col gap-4">
        <div className="input flex flex-col gap-1">
          <label className="pl-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            value={date}
            name="date"
            id="date"
            className="w-full bg-white border border-[#CBCBCB] rounded-md py-3 outline-none text-lg px-5"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input flex flex-col gap-1">
          <label className="pl-2">Time</label>
          <div className="flex gap-2">
            <Select
              options={hourOptions}
              value={hourOptions.find((option) => option.value === hour)}
              onChange={(selectedOption) => setHour(selectedOption.value)}
              placeholder="Hour"
              className="w-1/3"
              menuPlacement={"auto"}
              menuPosition={"fixed"}
            />
            <Select
              options={minuteOptions}
              value={minuteOptions.find((option) => option.value === minute)}
              onChange={(selectedOption) => setMinute(selectedOption.value)}
              placeholder="Minute"
              className="w-1/3"
              menuPlacement={"auto"}
              menuPosition={"fixed"}
            />
            <Select
              options={ampmOptions}
              value={ampmOptions.find((option) => option.value === ampm)}
              onChange={(selectedOption) => setAmPm(selectedOption.value)}
              placeholder="AM/PM"
              className="w-1/3"
              menuPlacement={"auto"}
              menuPosition={"fixed"}
            />
          </div>
        </div>
        <div className="input flex flex-col gap-1">
          <label className="pl-2" htmlFor="Description">
            Description
          </label>
          <input
            type="text"
            value={description}
            name="description"
            id="description"
            className="w-full bg-white border border-[#CBCBCB] rounded-md py-3 outline-none text-lg px-5"
            placeholder={"Write description here"}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="bg-primary-blue text-white w-full py-4 rounded-md"
          onClick={handleAddAppointment} // Call the function on button click
        >
          Set Appointment
        </button>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;
