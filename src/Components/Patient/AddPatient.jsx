import React, { useState } from "react";
// import { createChild } from "../Services/api";
import { useNavigate } from "react-router-dom";
import { useAddChild } from "src/Hooks/PatientHooks.js";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { FaChild, FaTimes } from "react-icons/fa";

const AddPatient = ({ refetchChildrens, closeModal }) => {
  const [child, setChild] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dataOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { mutate: addChild } = useAddChild();
  
  const changeHandler = (e) => {
    setChild({ ...child, [e.target.name]: e.target.value });
    
    // Clear error when field is edited
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!child.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!child.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!child.gender) {
      newErrors.gender = "Please select a gender";
    }
    
    if (!child.dataOfBirth) {
      newErrors.dataOfBirth = "Date of birth is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const toastId = toast.loading("Adding your child...");
    setLoading(true);
    
    addChild(child, {
      onSuccess: () => {
        setLoading(false);
        toast.success("Child added successfully!", { id: toastId });
        closeModal();
        refetchChildrens();
      },
      onError: (error) => {
        setLoading(false);
        toast.error(error?.message || "Error adding child", { id: toastId });
      },
    });
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-primary-blue/5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800 flex items-center">
          <FaChild className="mr-2 text-primary-blue" /> 
          Add New Child
        </h2>
        <button 
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>
      
      <form onSubmit={submitHandler} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name Input */}
          <div className="col-span-1">
            <label className="block text-sm font-light text-gray-600 mb-1" htmlFor="firstName">
              First Name*
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={child.firstName}
              placeholder="Enter first name"
              className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
              onChange={changeHandler}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name Input */}
          <div className="col-span-1">
            <label className="block text-sm font-light text-gray-600 mb-1" htmlFor="lastName">
              Last Name*
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={child.lastName}
              placeholder="Enter last name"
              className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
              onChange={changeHandler}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          {/* Gender Selection */}
          <div className="col-span-1">
            <label className="block text-sm font-light text-gray-600 mb-1">
              Gender*
            </label>
            <div className="flex space-x-6 mt-2">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={child.gender === "Male"}
                  onChange={changeHandler}
                  className="h-4 w-4 text-primary-blue focus:ring-primary-blue"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={child.gender === "Female"}
                  onChange={changeHandler}
                  className="h-4 w-4 text-primary-blue focus:ring-primary-blue"
                />
                <span>Female</span>
              </label>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          {/* Date of Birth Input */}
          <div className="col-span-1">
            <label className="block text-sm font-light text-gray-600 mb-1" htmlFor="dataOfBirth">
              Date of Birth*
            </label>
            <input
              type="date"
              name="dataOfBirth"
              id="dataOfBirth"
              value={child.dataOfBirth}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2 border ${errors.dataOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
              onChange={changeHandler}
            />
            {errors.dataOfBirth && (
              <p className="mt-1 text-sm text-red-500">{errors.dataOfBirth}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Child..." : "Add Child"}
          </motion.button>
          <p className="text-xs text-gray-500 text-center mt-2">
            *Required fields
          </p>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
