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

  return (
    <div className="w-full px-4 md:px-14 flex flex-col h-full mt-16 gap-6">
      <div className="w-full flex flex-col lg:flex-row gap-6 justify-between">
        {/* Calendar Component */}
        <div className="w-full lg:w-2/3 ">
          <h1 className="font-serif font-semibold text-lg md:text-xl text-center mb-8">
            Appointments
          </h1>
          <Calendar
            onChange={setDate}
            value={date}
            className="w-full"
            calendarType="gregory"
            minDetail="month"
            maxDetail="month"
            tileClassName={tileClassName}
          />
        </div>

        <div className="w-full lg:w-1/3 bg-transparent mt-8 lg:mt-0">
          <h1 className="font-serif font-medium text-lg lg:text-xl mb-6 lg:mb-8 text-center">
            Appointments for {date.toDateString()}
          </h1>
          {filteredAppointments?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b flex justify-between border-gray-300 px-2 lg:px-4">
                  <th className="text-left py-2 text-sm lg:text-base">
                    Patient
                  </th>
                  <th className="text-left py-2 text-sm lg:text-base">
                    Description
                  </th>
                  <th className="text-left py-2 text-sm lg:text-base">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment, index) => (
                  <tr
                    key={index}
                    className="flex justify-between w-full py-3 lg:py-5 border-b border-[#B8B8B8] px-2 lg:px-4 cursor-pointer"
                  >
                    <td className="text-sm lg:text-base">
                      {appointment.patientName || ""}{" "}
                      {appointment.patientSurname || ""}
                    </td>
                    <td className="text-sm lg:text-base">
                      {appointment.description}
                    </td>
                    <td className="text-sm lg:text-base">{appointment.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-sm lg:text-base">
              No appointments for this date.
            </p>
          )}
        </div>
      </div>

      <div className="w-full bg-transparent mt-8 flex flex-col gap-12">
        {patient && patient?.customId && (
          <DiagnosisTable customId={patient?.customId} />
        )}
        {patient && patient?.customId && (
          <TableData customId={patient?.customId} />
        )}
      </div>
    </div>
  );
};

export default CalenderTableComp;
