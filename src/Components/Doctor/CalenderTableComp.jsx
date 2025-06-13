import TableData from "./TableData.jsx";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import DiagnosisTable from "./DiagnosisTable.jsx";
import { useParams } from "react-router-dom";
import {
  useAppointmentsByPatient,
  usePatientById,
} from "src/Hooks/DoctorHooks.js";

const CalenderTableComp = () => {
  const { id } = useParams();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [date, setDate] = useState(new Date());
  const { data: appointments } = useAppointmentsByPatient(id);
  const { data: patient } = usePatientById(id);

  // Filter appointments for the selected date
  useEffect(() => {
    const filtered = appointments?.filter(
      (appointment) =>
        new Date(appointment.date).toDateString() === date.toDateString()
    );
    setFilteredAppointments(filtered);
  }, [date, appointments]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasAppointment = appointments?.some(
        (appointment) =>
          new Date(appointment.date).toDateString() === date.toDateString()
      );
      return hasAppointment ? "booked-day" : null;
    }
    return null;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-light text-gray-800">Appointments Calendar</h2>
        <p className="text-sm text-gray-500 mt-1">Schedule and view appointments</p>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Calendar Component */}
          <div className="w-full lg:w-3/5 bg-gray-50 rounded-xl p-5 h-full flex flex-col">
            <h3 className="text-lg font-light text-gray-800 mb-4">Calendar</h3>
            <div className="flex-1 flex justify-center items-start">
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
          </div>

          {/* Appointments List */}
          <div className="w-full lg:w-2/5 bg-gray-50 rounded-xl p-5 h-full flex flex-col">
            <h3 className="text-lg font-light text-gray-800 mb-4">
              {formatDate(date)}
            </h3>

            <div className="flex-1 overflow-y-auto">
              {filteredAppointments?.length > 0 ? (
                <div className="overflow-hidden rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                          Patient
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                          Description
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment, index) => (
                        <tr
                          key={index}
                          className="border-t border-gray-200 hover:bg-white transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {appointment.patientName || ""}{" "}
                            {appointment.patientSurname || ""}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {appointment.description}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700 text-right">
                            {appointment.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="rounded-full bg-gray-200 p-3 mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-light">
                    No appointments scheduled for this date.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Patient Data Tables */}
        {patient && patient?.customId && (
          <div className="w-full space-y-6 mt-8">
            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-white">
                <h3 className="text-lg font-light text-gray-800">Diagnosis History</h3>
              </div>
              <div className="p-5 bg-white">
                <DiagnosisTable customId={patient?.customId} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-white">
                <h3 className="text-lg font-light text-gray-800">Growth Data</h3>
              </div>
              <div className="p-5 bg-white">
                <TableData customId={patient?.customId} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderTableComp;
