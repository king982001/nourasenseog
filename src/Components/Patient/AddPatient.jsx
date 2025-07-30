import React, { useState } from "react";
// import { createChild } from "../Services/api";
import { useNavigate } from "react-router-dom";
import { useAddChild } from "src/Hooks/PatientHooks.js";
import toast from "react-hot-toast";

const AddPatient = ({ refetchChildrens, closeModal }) => {
  const [child, setChild] = useState({
    name: "",
    surname: "",
    gender: "",
    data_of_birth: "",
  });
  const [patientID, setPatientID] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutate: addChild } = useAddChild();
  const changeHandler = (e) => {
    setChild({ ...child, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please Wait!");
    setLoading(true);
    addChild(child, {
      onSuccess: () => {
        setLoading(false);
        toast.success("Child added successfully!", { id: toastId });
        closeModal();
        refetchChildrens();
      },
      onError: () => {
        setLoading(false);
        closeModal();
        toast.error("Error creating child", { id: toastId });
      },
    });
  };
  return (
    <div className="pop-up px-8 bg-white py-4 mx-auto rounded-lg flex flex-col gap-4">
      <h1 className="font-serif text-xl font-semibold text-center">
        Add Child
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-4">
          {/* First Name Input */}
          <div className="input flex flex-col gap-2">
            <label className="pl-2" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full bg-white border border-[#CBCBCB] rounded-md py-3 outline-none text-lg px-5"
              onChange={changeHandler}
            />
          </div>

          {/* Last Name Input */}
          <div className="input flex flex-col gap-2">
            <label className="pl-2" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              className="w-full bg-white border border-[#CBCBCB] rounded-md py-3 outline-none text-lg px-5"
              onChange={changeHandler}
            />
          </div>

          {/* Gender Selection */}
          <div className="input flex flex-col gap-2">
            <label className="pl-2" htmlFor="gender">
              Gender
            </label>
            <div className="flex gap-20 pl-2">
              <label htmlFor="male" className="flex items-center text-black/70">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={changeHandler}
                  required
                />
                Male
              </label>
              <label
                htmlFor="female"
                className="flex items-center text-black/70"
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={changeHandler}
                  required
                />
                Female
              </label>
            </div>
          </div>

          {/* Date of Birth Input */}
          <div className="input flex flex-col gap-2">
            <label className="pl-2" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              id="dob"
              className="w-full bg-white border border-[#CBCBCB] rounded-md py-3 outline-none text-lg px-5"
              onChange={changeHandler}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className={"mt-6"}>
          <button
            type="submit"
            className="bg-primary-blue text-white w-full py-4 rounded-md"
          >
            {loading ? "Adding..." : "Add Child"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
