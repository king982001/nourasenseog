import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaTimes } from 'react-icons/fa';
import { useDiagnose } from 'src/Hooks/DoctorHooks.js';
import toast from 'react-hot-toast';

const DiagnosisModal = ({ isOpen, onClose, patient }) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    head_circumference: '',
    month: '',
  });

  const { mutate: diagnose, isLoading } = useDiagnose();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    diagnose(
      { 
        patientId: patient._id,
        ...formData
      },
      {
        onSuccess: () => {
          toast.success('Diagnosis added successfully');
          onClose();
          setFormData({
            height: '',
            weight: '',
            head_circumference: '',
            month: '',
          });
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to add diagnosis');
        }
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-light">New Diagnosis</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Month</label>
                  <input
                    type="number"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Head Circumference (cm)</label>
                  <input
                    type="number"
                    name="head_circumference"
                    value={formData.head_circumference}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    step="0.1"
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Diagnosis'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiagnosisModal; 