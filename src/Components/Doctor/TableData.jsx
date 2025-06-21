import React, { useState, useEffect } from "react";
import { AiOutlineDownload, AiOutlineShareAlt, AiOutlineEye } from "react-icons/ai";
import DataTable from "react-data-table-component";
import Dropdown from "src/assets/Doctor/Dropdown.svg";
import { useParams } from "react-router-dom";
import { useReportHistory } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import ReportContentModal from "./ReportContentModal";

const TableData = ({ customId }) => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Static demonstration data
  const demoData = [{
    date: "2024-03-20",
    report_number: "RPT-2024-001",
    assigned_doctor: "Dr. Sarah Johnson",
    report_link: "#",
    content: {
      Prognosis: "Favorable prognosis with expected recovery in 5-7 days...",
      Diagnosis: "Upper respiratory infection with mild symptoms...",
      Treatment: "Rest, hydration, and prescribed medications...",
      Recommendations: "Follow-up in 2 weeks if symptoms persist..."
    }
  }];
  
  const {
    data: reports,
    isLoading: reportsLoading,
    error,
    refetch,
  } = useReportHistory(customId, page);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      width: "25%",
    },
    {
      name: "Report Number",
      selector: (row) => row.report_number || "N/A",
      width: "20%",
    },
    {
      name: "Responsible Doctor",
      selector: (row) => row.assigned_doctor,
      width: "30%",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleViewReport(row)}
            className="p-2 rounded-full hover:bg-gray-200 transition-all"
            title="View Report"
          >
            <AiOutlineEye className="text-2xl text-purple-600 hover:text-purple-800" />
          </button>
          <button
            onClick={() => handleDownload(row.report_link)}
            className="p-2 rounded-full hover:bg-gray-200 transition-all"
            title="Download"
          >
            <AiOutlineDownload className="text-2xl text-blue-600 hover:text-blue-800" />
          </button>
          <button
            onClick={() => handleShare(row.report_link)}
            className="p-2 rounded-full hover:bg-gray-200 transition-all"
            title="Share"
          >
            <AiOutlineShareAlt className="text-2xl text-green-600 hover:text-green-800" />
          </button>
        </div>
      ),
      width: "25%",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        textAlign: "center !important",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        textAlign: "center !important",
        justifyContent: "center",
      },
    },
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDownload = (report_link) => {
    toast.success("Download feature will be implemented soon!");
  };

  const handleShare = async (report_link) => {
    toast.success("Share feature will be implemented soon!");
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="font-serif text-xl font-semibold text-center">Reports</h1>
      <div className="justify-end flex mb-2 text-center">
        <button className="flex gap-2 items-center justify-center text-sm px-2 py-2 border-[1.5px] border-black rounded-md">
          <span>Most Recent</span>
          <span>
            <img className="h-4" src={Dropdown} alt="" />
          </span>
        </button>
      </div>
      {reportsLoading && (
        <div className={"flex justify-center items-center text-primary-blue"}>
          <ClipLoader color={"#002f88"} />
        </div>
      )}
      {!reportsLoading && (
        <>
          <DataTable
            columns={columns}
            data={error ? demoData : (reports?.report_history || demoData)}
            pagination
            paginationServer
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            paginationTotalRows={error ? 1 : (reports?.total_records || 1)}
            paginationPerPage={10}
            paginationDefaultPage={1}
            onChangePage={handlePageChange}
            fixedHeader
            responsive
            pointerOnHover
            customStyles={customStyles}
          />
          <ReportContentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            reportData={selectedReport}
          />
        </>
      )}
    </div>
  );
};

export default TableData;
