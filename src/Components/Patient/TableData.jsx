import React from "react";
import DataTable from "react-data-table-component";
import Dropdown from "src/assets/Doctor/Dropdown.svg";
import { useParams } from "react-router-dom";
import { useReportHistory } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import { AiOutlineDownload, AiOutlineShareAlt } from "react-icons/ai";

const TableData = () => {
  const { id } = useParams();
  const {
    data: reports,
    isLoading: reportsLoading,
    error,
  } = useReportHistory(id);

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Responsible Doctor",
      selector: (row) => row.assigned_doctor,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-4 justify-center">
          {/* Download Button */}
          <button
            onClick={() => handleDownload(row.report_link)}
            className="p-2 rounded-full hover:bg-gray-200 transition-all"
            title="Download"
          >
            <AiOutlineDownload className="text-2xl text-blue-600 hover:text-blue-800" />
          </button>
          {/* Share Button */}
          <button
            onClick={() => handleShare(row.report_link)}
            className="p-2 rounded-full hover:bg-gray-200 transition-all"
            title="Share"
          >
            <AiOutlineShareAlt className="text-2xl text-green-600 hover:text-green-800" />
          </button>
        </div>
      ),
      width: "30%",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        textAlign: "center !important", // Enforce alignment in headers
        justifyContent: "center", // Ensures alignment works visually
      },
    },
    cells: {
      style: {
        textAlign: "center !important", // Enforce alignment in cells
        justifyContent: "center", // Centers content visually
      },
    },
  };

  const handleDownload = (report_link) => {
    const anchor = document.createElement("a");
    anchor.href = report_link;
    anchor.download = report_link.split("/").pop(); // Use the file name from the link
    anchor.target = "_blank"; // Optional: Open in a new tab
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  const handleShare = async (report_link) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Report Link",
          url: report_link,
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard
        .writeText(report_link)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  };
  return (
    <div>
      <h1 className="font-serif text-xl font-semibold text-center">Reports</h1>
      <div className="justify-end flex mb-2 text-center">
        <button className="flex gap-2 items-center justify-center text-sm px-2 py-2 border-[1.5px] border-black rounded-md">
          <span>Most Recent</span>
          <span>
            <img className="h-4" src={Dropdown} alt="Dropdown" />
          </span>
        </button>
      </div>
      {error && (
        <div className="flex justify-center items-center">
          You have not generated any reports yet.
        </div>
      )}
      {reportsLoading && (
        <div className={"flex justify-center items-center text-primary-blue"}>
          <ClipLoader color={"#002f88"} />
        </div>
      )}
      {!reportsLoading && !error && (
        <DataTable
          columns={columns}
          data={reports?.report_history}
          fixedHeader
          responsive
          pointerOnHover
          customStyles={customStyles}
        />
      )}
    </div>
  );
};

export default TableData;
