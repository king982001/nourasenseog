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
    <div className="w-full px-4 md:px-8 flex flex-col h-full mt-8 gap-8">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Calendar Component */}
        <div className="w-full lg:w-3/5 bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-xl font-light text-gray-800 mb-5 border-b pb-3">
            Appointments Calendar
          </h2>
          <div className="flex justify-center">
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
        <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-xl font-light text-gray-800 mb-5 border-b pb-3">
            {formatDate(date)}
          </h2>
          
          {filteredAppointments?.length > 0 ? (
            <div className="overflow-hidden rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
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
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
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
            <div className="py-8 text-center">
              <p className="text-gray-500 font-light">
                No appointments scheduled for this date.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Patient Data Tables */}
      {patient && patient?.customId && (
        <div className="w-full space-y-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-light text-gray-800">Diagnosis History</h2>
            </div>
            <div className="p-5">
              <DiagnosisTable customId={patient?.customId} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-light text-gray-800">Growth Data</h2>
            </div>
            <div className="p-5">
              <TableData customId={patient?.customId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalenderTableComp;
