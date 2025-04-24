import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { useReportHistory } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import { FaDownload, FaShareAlt, FaFileAlt, FaExclamationTriangle, FaSortAmountDown } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";

const TableData = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Most Recent");
  const {
    data: reports,
    isLoading,
    error,
    refetch,
  } = useReportHistory(id, page);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr || 'N/A';
    }
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => <div className="py-2">{formatDate(row.date)}</div>,
    },
    {
      name: "Responsible Doctor",
      selector: (row) => row.assigned_doctor,
      sortable: true,
      cell: (row) => (
        <div className="py-2">
          {row.assigned_doctor || 'Not assigned'}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleDownload(row.report_link)}
            className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            title="Download"
          >
            <FaDownload size={16} />
          </button>
          <button
            onClick={() => handleShare(row.report_link)}
            className="p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            title="Share"
          >
            <FaShareAlt size={16} />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f8fafc",
        border: "none",
        fontSize: "14px",
        fontWeight: "500",
        color: "#374151",
      },
    },
    headCells: {
      style: {
        padding: "16px",
        fontWeight: "500",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        backgroundColor: "#fff",
        border: "none",
        borderBottom: "1px solid #f1f5f9",
        "&:last-of-type": {
          borderBottom: "none",
        },
        "&:hover": {
          backgroundColor: "#f8fafc",
        },
      },
    },
    cells: {
      style: {
        padding: "8px 16px",
      },
    },
    pagination: {
      style: {
        borderTop: "1px solid #f1f5f9",
        backgroundColor: "#fff",
      },
      pageButtonsStyle: {
        color: "#3b82f6",
        fill: "#3b82f6",
        "&:disabled": {
          color: "#cbd5e1",
          fill: "#cbd5e1",
        },
        "&:hover:not(:disabled)": {
          backgroundColor: "#eff6ff",
        },
        "&:focus": {
          outline: "none",
        },
      },
    },
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDownload = (report_link) => {
    if (!report_link) {
      toast.error("Download link not available");
      return;
    }
    
    const anchor = document.createElement("a");
    anchor.href = report_link;
    anchor.download = report_link.split("/").pop();
    anchor.target = "_blank";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    toast.success("Downloading report");
  };
  
  const handleShare = async (report_link) => {
    if (!report_link) {
      toast.error("Share link not available");
      return;
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Medical Report",
          url: report_link,
        });
        toast.success("Report shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
        navigator.clipboard.writeText(report_link)
          .then(() => toast.success("Link copied to clipboard"))
          .catch(() => toast.error("Failed to copy link"));
      }
    } else {
      navigator.clipboard
        .writeText(report_link)
        .then(() => toast.success("Link copied to clipboard"))
        .catch(() => toast.error("Failed to copy link"));
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="bg-primary-blue/5 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-light text-gray-800 flex items-center">
          <FaFileAlt className="mr-2 text-primary-blue" />
          Reports
        </h2>
        
        <div className="relative">
          <button
            className="flex items-center text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FaSortAmountDown className="mr-2 text-gray-500 text-xs" />
            {sortOrder}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-yellow-50 p-4 mb-4">
              <FaExclamationTriangle className="text-yellow-500 text-2xl" />
            </div>
            <h3 className="text-lg font-light text-gray-800 mb-2">No Reports Available</h3>
            <p className="text-gray-600 max-w-md">
              There are no reports generated for this child yet.
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <ClipLoader size={40} color="#3b82f6" />
            <p className="mt-4 text-gray-600 font-light">Loading reports...</p>
          </div>
        ) : reports?.report_history?.length > 0 ? (
          <DataTable
            columns={columns}
            data={reports.report_history}
            pagination
            paginationServer
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            paginationTotalRows={reports?.total_records || 0}
            paginationPerPage={reports?.page_size || 10}
            paginationDefaultPage={reports?.current_page || 1}
            onChangePage={handlePageChange}
            fixedHeader
            responsive
            customStyles={customStyles}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-blue-50 p-4 mb-4">
              <FaFileAlt className="text-primary-blue text-2xl" />
            </div>
            <h3 className="text-lg font-light text-gray-800 mb-2">No Reports Found</h3>
            <p className="text-gray-600 max-w-md">
              There are no reports available for this child at the moment.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TableData;
