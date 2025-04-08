import React, { useEffect } from "react";

const Prompt = ({ isOpen, title, message, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling when the prompt is closed
      document.body.style.overflow = "auto";
    }

    // Clean up to reset body overflow when the component unmounts or the prompt is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null; // Return null if the modal isn't open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/3">
        <h2 className="text-xl font-semibold text-[#002F88] mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#002F88] text-white px-4 py-2 rounded-md hover:bg-[#001E5E]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
