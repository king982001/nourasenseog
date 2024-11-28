import React, { useEffect, useState } from "react";
import {
  useGetStatistics,
  useUnverifiedDoctors,
} from "src/Hooks/AdminHooks.js";
import { ClipLoader } from "react-spinners";
import { StatisticCard } from "src/Components/Admin/StatisticCard.jsx";
import Doctor from "src/assets/Admin/doctor.svg";
import Diagnoses from "src/assets/Admin/diagnostic.svg";
import Patient from "src/assets/Admin/user.svg";
import SearchIcon from "src/assets/Admin/search-icon.svg";
import { useNavigate } from "react-router-dom";
import SomethingWentWrong from "src/Pages/Admin/SomethingWentWrong.jsx";
import formatDate from "src/Utilities/Admin/formatDate.js";

export const Dashboard = () => {
  const {
    data: statistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = useGetStatistics();

  const {
    data,
    isLoading: isAllDoctorsLoading,
    isError: isAllDoctorsError,
  } = useUnverifiedDoctors();

  const doctors = data?.data;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Nourasense - Dashboard";
  }, []);

  if (isStatisticsLoading || isAllDoctorsLoading) {
    return (
      <div
        className={
          "w-full h-[80vh] flex flex-col items-center justify-center gap-y-1"
        }
      >
        <ClipLoader color={"#002F88"} size={44} />
        <p className={"font-Inter font-bold"}>Please wait</p>
      </div>
    );
  }

  if (isStatisticsError || isAllDoctorsError) {
    return <SomethingWentWrong />;
  }

  const statisticsCardData = [
    {
      name: "Doctors",
      icon: Doctor,
      numbers: statistics.data.totalDoctors,
      text: "Total number of registered medical professionals",
    },
    {
      name: "Patients",
      icon: Patient,
      numbers: statistics.data.totalPatients,
      text: "Total number of registered patients",
    },
    {
      name: "Diagnoses",
      icon: Diagnoses,
      numbers: statistics.data.totalReports,
      text: "Total number of patient diagnoses made",
    },
  ];

  const filteredDoctors = doctors?.doctors?.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.customId?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={
        "w-full h-full flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 pb-28 mt-8"
      }
    >
      <p className={"font-Ledger text-lg font-medium"}>
        {formatDate(Date.now())}
      </p>
      <div className={"mt-5 w-full"}>
        <div
          className={
            "flex flex-col md:flex-row items-center gap-3 md:gap-y-0 md:justify-evenly"
          }
        >
          {statisticsCardData?.map((cardData, index) => (
            <StatisticCard
              key={index}
              name={cardData.name}
              icon={cardData.icon}
              numbers={cardData.numbers}
              text={cardData.text}
            />
          ))}
        </div>
        <div className={"lg:px-8 px-2 mt-6"}>
          <p className={"font-Ledger text-xl md:text-2xl font-medium"}>
            Doctors
          </p>
          <div
            className={
              "border-2 border-gray-300 mt-4 px-4 flex items-center rounded-md"
            }
          >
            <img src={SearchIcon} className={"size-7"} alt="search icon" />
            <input
              type="text"
              className={
                "w-full h-[56px] px-4 focus:outline-none  !border-0 !mt-0 text-lg font-Inter text-gray-500"
              }
              placeholder={"Search by name or ID"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={"mt-5 overflow-x-auto"}>
            <table className="min-w-full border-collapse bg-white font-Inter">
              <thead className="bg-gray-100">
                <tr className="text-center">
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Doctor&#39;s ID</th>
                  <th className="px-4 py-2 border-b">Establishment Name</th>
                  <th className="px-4 py-2 border-b">Registration Date</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors?.length > 0 ? (
                  filteredDoctors.map((doctor, index) => (
                    <tr key={index} className="hover:bg-gray-100 text-center">
                      <td className="px-4 py-2 border-b">
                        {doctor.name} {doctor.surname}
                      </td>
                      <td className="px-4 py-2 border-b">{doctor.customId}</td>
                      <td className="px-4 py-2 border-b">
                        {doctor.registration?.establishment_name}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {formatDate(doctor.updatedAt)}
                      </td>
                      <td className="px-4 py-2 border-b">
                        <button
                          onClick={() =>
                            navigate(`/admin/verify/${doctor._id}`)
                          }
                          className="ml-2 py-2 px-12 text-white bg-[#002F88] rounded-md"
                        >
                          Verify
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 border-b text-center text-gray-500"
                    >
                      No doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
