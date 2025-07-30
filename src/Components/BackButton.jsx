import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export const BackButton = ({ display = "absolute" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.key === "default") {
      navigate("/"); // Fallback route when no history exists
    } else {
      navigate(-1); // Navigates to the last page in the history stack
    }
  };

  return (
    <div className={`${display} left-0 my-3`}>
      <button
        onClick={handleBackClick}
        className="flex items-center bg-white border border-primary-blue font-medium text-primary-blue hover:bg-primary-blue hover:border-gray-800 hover:text-white transition-colors h-10 px-4 py-2 mx-6 md:h-10 md:px-6 md:mx-8 text-center rounded"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
    </div>
  );
};

export default BackButton;
