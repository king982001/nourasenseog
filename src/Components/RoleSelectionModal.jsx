import React, { useState } from "react";
import { FaUserMd, FaUser } from "react-icons/fa"; // Importing icons from react-icons

const RoleSelectionModal = ({ onClose, onSelectRole }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-normal font-serif text-center text-gray-800 mb-4">
          Are you a Doctor or Guardian?
        </h2>
        <p className="text-gray-600 font-sans text-center tracking-tight mb-6">
          Select your role to continue with sign in or sign up.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {/* Doctor Card */}
          <button
            onClick={() => onSelectRole("doctor")}
            className="flex flex-col items-center p-4 bg-primary-blue text-white rounded-lg hover:bg-primary-blue-dark transition duration-200"
          >
            <FaUserMd size={36} className="mb-2" />
            <span className="font-normal text-lg">Doctor</span>
          </button>
          {/* Guardian Card */}
          <button
            onClick={() => onSelectRole("guardian")}
            className="flex flex-col items-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            <FaUser size={36} className="mb-2" />
            <span className="font-normal text-lg">Guardian</span>
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 px-4 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
