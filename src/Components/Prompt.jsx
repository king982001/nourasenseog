import React, { useEffect } from "react";
import { motion } from "motion/react";

const Prompt = ({ isOpen, title = "Confirmation", message, onConfirm, onCancel }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-md w-full max-w-md overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-xl font-light text-gray-800">{title}</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 font-light">{message}</p>
        </div>
        
        <div className="p-5 border-t border-gray-100 flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-light transition-colors"
          >
            Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onConfirm}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-light transition-colors"
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Prompt;
