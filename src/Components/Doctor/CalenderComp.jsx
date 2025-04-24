import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "src/Hooks/DoctorHooks.js";

const CalendarComp = () => {
  const [date, setDate] = useState(new Date());
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const navigate = useNavigate();
  const { data: appointments, isError, isLoading } = useAppointments();

  // Filter appointments for the selected date
  useEffect(() => {
    const filtered = appointments?.filter(
      (appointment) =>
        new Date(appointment.date).toDateString() === date.toDateString(),
    );
    setFilteredAppointments(filtered);
  }, [date, appointments]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasAppointment = appointments?.some(
        (appointment) =>
          new Date(appointment.date).toDateString() === date.toDateString(),
      );
      return hasAppointment ? "booked-day" : null;
    }
    return null;
  };
  
  const navigateToPatientProfile = (patientId) => {
    navigate(`/doctor/patient/${patientId}`);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Calendar Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-xl font-light text-gray-800">Calendar</h2>
          <p className="text-sm text-gray-500 mt-1">Select a date to view appointments</p>
        </div>
        <div className="p-4">
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full border-0 shadow-none"
            calendarType="gregory"
            minDetail="month"
            maxDetail="month"
            tileClassName={tileClassName}
          />
        </div>
      </motion.div>

      {/* Appointments Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-xl font-light text-gray-800">Appointments</h2>
          <p className="text-sm text-gray-500 mt-1">{date.toDateString()}</p>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="py-8 text-center">
              <svg className="animate-spin h-6 w-6 text-gray-700 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-500 font-light text-sm">Loading appointments...</p>
            </div>
          ) : filteredAppointments?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-light text-gray-600">Patient</th>
                    <th className="text-left py-3 px-4 text-sm font-light text-gray-600">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-light text-gray-600">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      onClick={() => navigateToPatientProfile(appointment.patientId)}
                    >
                      <td className="py-3 px-4 text-sm font-light">
                        {appointment.patientName || ""} {appointment.patientSurname || ""}
                      </td>
                      <td className="py-3 px-4 text-sm font-light">{appointment.description}</td>
                      <td className="py-3 px-4 text-sm font-light">{appointment.time}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 font-light">No appointments scheduled for this date.</p>
              <p className="text-gray-400 text-sm mt-1">Select another date or add a new appointment.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarComp;
