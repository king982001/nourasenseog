import { useState } from "react";
import Select from "react-select";
import { useAddPatient } from "../../Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const AddPatient = ({ closeModal, refetchPatients }) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("male");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [patientID, setPatientID] = useState("");
  const { mutate: addPatient } = useAddPatient();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "100%",
      border: "none",
      boxShadow: state.isFocused ? "none" : base.boxShadow,
    }),
    menu: (base) => ({ ...base, marginTop: 0, zIndex: 1 }),
    menuList: (base) => ({
      ...base,
      maxHeight: 150,
      overflowY: "auto",
      position: "absolute",
      width: "100%",
      backgroundColor: "#fff",
    }),
    placeholder: (base) => ({ ...base, color: "#aaa" }),
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
      patientID: patientID, // Include this if needed
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
      onError: () => {
        toast.error("Unable to add patient");
      },
    });
  };

  return (
    <div className="pop-up px-8 bg-white py-4 mx-auto rounded-lg flex flex-col gap-4">
      <h1 className="font-serif text-xl font-semibold text-center">
        Add Patient
      </h1>
      <div className="flex flex-col gap-5">
        <div className={"w-full flex gap-2 flex-col"}>
          <div className="input flex flex-col gap-2">
            <label className="pl-2" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              name="firstname"
              id="firstname"
              className="w-full bg-white border border-[#CBCBCB] !mt-0 rounded-sm lg:rounded-md py-3 outline-none text-lg px-5"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input flex flex-col gap-2">
            <label className="pl-2" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              value={surname}
              name="lastname"
              id="lastname"
              className="w-full bg-white border border-[#CBCBCB] !mt-0 rounded-sm lg:rounded-md py-3 outline-none text-lg px-5"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>
        <div className="input flex flex-col gap-1">
          <label className="pl-2 " htmlFor="gender">
            Gender
          </label>
          <div className="flex gap-20 pl-2">
            <label htmlFor="male" className="flex items-center text-black/70">
              <input
                defaultChecked
                type="radio"
                value="male"
                name="gender"
                id="male"
                className="border mr-2"
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label htmlFor="female" className="flex items-center text-black/70">
              <input
                type="radio"
                value="female"
                name="gender"
                id="female"
                className="border mr-2"
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </div>
        <div className="input flex flex-col lg:flex-row justify-between gap-2 lg:gap-10">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="pl-2" htmlFor="day">
              Day
            </label>
            <Select
              name="day"
              id="day"
              value={day}
              className="w-full bg-white border border-[#CBCBCB] rounded-md py-1.5 outline-none text-md px-5"
              onChange={(option) => setDay(option)}
              options={dayOptions}
              styles={customStyles}
              placeholder="Day"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label className="pl-2" htmlFor="month">
              Month
            </label>
            <Select
              options={monthOptions}
              styles={customStyles}
              placeholder="Month"
              name="month"
              value={month}
              id="month"
              className="w-full bg-white border border-[#CBCBCB] rounded-md py-1.5 outline-none text-md px-5"
              onChange={(option) => setMonth(option)}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label className="pl-2" htmlFor="year">
              Year
            </label>
            <Select
              options={yearOptions}
              placeholder="Year"
              name="year"
              value={year}
              id="year"
              className="w-full bg-white border border-[#CBCBCB] rounded-md py-1.5 outline-none text-md px-5 relative"
              onChange={(option) => setYear(option)}
              styles={customStyles}
            />
          </div>
        </div>

        <div className="partition py-1">
          <h1 className="text-[#7A7A7A] text-center text-sm">OR</h1>
          <h1 className="text-[#7A7A7A] text-sm text-center">
            Use patient ID if patient already has a profile
          </h1>
        </div>

        <div className="input flex flex-col gap-1.5">
          <label className="pl-2" htmlFor="patientID">
            Patient ID
          </label>
          <input
            type="text"
            value={patientID}
            name="patientID"
            id="patientID"
            className="w-full bg-white border border-[#CBCBCB] rounded-md py-2.5 outline-none text-lg px-5"
            onChange={(e) => setPatientID(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className="bg-primary-blue text-white w-full py-4 rounded-md"
          onClick={handleAddPatient} // Call the function on button click
        >
          Add Patient
        </button>
      </div>
    </div>
  );
};

export default AddPatient;
