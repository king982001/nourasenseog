import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr"; // Importing icons from react-icons

const RoleSelectionModal = ({ onClose, onSelectRole }) => {
  const [role, setRole] = useState("doctor");

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-[90vw] sm:max-w-lg md:max-w-xl mx-4 p-2">
        <div
          className={
            "flex h-full justify-end items-center text-gray-800 hover:text-gray-600"
          }
        >
          <GrFormClose
            size={32}
            className={"cursor-pointer"}
            onClick={onClose}
          />
        </div>
        <div className={" p-3 sm:p-6 md:py-6 md:px-14"}>
          <h2 className="text-xl sm:text-2xl font-normal font-serif text-center text-gray-800 mb-4">
            Choose an Account Type
          </h2>
          <p className="text-gray-600 font-sans text-xs sm:text-sm text-center mb-6">
            Before you continue, please choose which type of account you would
            like to register as.
          </p>
          <div className={"flex flex-col space-y-6"}>
            <div className={"flex flex-col space-y-4"}>
              <label htmlFor={"Account Type"} className={""}>
                Account Type
              </label>
              <select
                className={
                  "p-6 border border-[#CBCBCB] active:outline-none focus:outline-none rounded"
                }
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value={"doctor"}>Medical Professional</option>
                <option value={"parent"}>
                  General User(Parent, Guardian, etc)
                </option>
              </select>
            </div>
            <div className={"flex w-full"}>
              <button
                className={
                  "w-full rounded bg-primary-blue hover:opacity-90 transition-all p-6 text-white"
                }
                onClick={() => onSelectRole(role)}
              >
                Confirm Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
