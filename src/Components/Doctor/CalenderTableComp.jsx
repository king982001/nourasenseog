import TableData from "./TableData.jsx";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import DiagnosisTable from "./DiagnosisTable.jsx";

const CalenderTableComp = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({ booked: [], unavailable: [] });

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toDateString();
      if (tasks.booked.some((d) => d.toDateString() === dateStr)) {
        return "react-calender__tile--booked";
      }
      if (tasks.unavailable.some((d) => d.toDateString() === dateStr)) {
        return "react-calender__tile--not-available";
      }
    }
    return "react-calender__tile";
  };

  return (
    <div className="w-full px-4 md:px-14 flex flex-col h-full mt-16 gap-6">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Calendar Component */}
        <div className="w-full lg:w-1/3">
          <h1 className="font-serif font-semibold text-lg md:text-xl text-center mb-8">
            Appointments
          </h1>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="w-full"
            calendarType="gregory"
            minDetail="month"
            maxDetail="month"
            tileClassName={tileClassName}
          />
        </div>

        {/* TableData Component */}
        <div className="w-full lg:w-2/3 bg-transparent">
          <TableData />
        </div>
      </div>

      {/* DiagnosisTable Component */}
      <div className="w-full bg-transparent">
        <DiagnosisTable />
      </div>
    </div>
  );
};

export default CalenderTableComp;
