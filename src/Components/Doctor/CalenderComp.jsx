import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";

import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../Hooks/DoctorHooks.js";

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
    <div className="w-full px-4 md:px-10 lg:px-14 flex flex-col lg:flex-row items-center lg:items-start justify-between h-full mt-10 lg:mt-16 gap-8 lg:gap-12">
      <div className="w-full lg:w-2/3">
        <h1 className="font-serif font-semibold text-lg lg:text-xl mb-6 lg:mb-8 text-center lg:text-left">
          Appointments Calendar
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
                <th className="text-left py-2 text-sm lg:text-base">Patient</th>
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
                  onClick={() =>
                    navigateToPatientProfile(appointment.patientId)
                  }
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
  );
};

export default CalendarComp;
