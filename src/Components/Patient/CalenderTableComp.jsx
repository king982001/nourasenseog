import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import TableData from "./TableData.jsx";
import DiagnosisTable from "./DiagnosisTable.jsx";
import { useParams } from "react-router-dom";
import { useAppointmentsByPatient } from "src/Hooks/DoctorHooks.js";
import { motion } from "motion/react";
import { FaCalendarAlt, FaRegClock, FaRegFileAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const CalenderTableComp = () => {
  const { id } = useParams();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [date, setDate] = useState(new Date());
  const { data: appointments, isLoading } = useAppointmentsByPatient(id);

  // Filter appointments for the selected date
  useEffect(() => {
    const filtered = appointments?.filter(
      (appointment) =>
        new Date(appointment.date).toDateString() === date.toDateString(),
    );
    setFilteredAppointments(filtered || []);
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

  const formatTime = (time) => {
    if (!time) return "Not specified";
    
    // If it's already in a readable format, return it
    if (time.includes(':') && (time.includes('AM') || time.includes('PM') || time.includes('am') || time.includes('pm'))) {
      return time;
    }
    
    // Try to parse as 24h format and convert to 12h
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const minute = parseInt(minutes, 10);
      
      if (isNaN(hour) || isNaN(minute)) return time;
      
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      
      return `${hour12}:${minutes.padStart(2, '0')} ${ampm}`;
    } catch (e) {
      return time;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="bg-primary-blue/5 px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-light text-gray-800 flex items-center">
            <FaCalendarAlt className="mr-2 text-primary-blue" />
            Appointments
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
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

            {/* Appointments for selected date */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-light text-gray-800 mb-4 flex items-center">
                <FaRegClock className="mr-2 text-primary-blue" />
                {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <ClipLoader size={30} color="#3b82f6" />
                  <p className="mt-4 text-sm text-gray-500">Loading appointments...</p>
                </div>
              ) : filteredAppointments?.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredAppointments.map((appointment, index) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {appointment.patientName || ""} {appointment.patientSurname || ""}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{appointment.description || "No description"}</p>
                        </div>
                        <div className="bg-blue-50 text-primary-blue text-sm py-1 px-2 rounded">
                          {formatTime(appointment.time)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="rounded-full bg-blue-50 p-3 mb-3">
                    <FaRegClock className="text-primary-blue text-xl" />
                  </div>
                  <p className="text-gray-600">No appointments for this date</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Diagnosis Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DiagnosisTable />
      </motion.div>

      {/* Table Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <TableData />
      </motion.div>
    </div>
  );
};

export default CalenderTableComp;
