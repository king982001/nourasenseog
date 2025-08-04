import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useChildrens, useDeleteChildren } from "src/Hooks/PatientHooks.js";
import AddPatient from "src/Components/Patient/AddPatient.jsx";
import { FaStethoscope, FaSearch, FaUser, FaPlus, FaTrash } from "react-icons/fa";
import Prompt from "src/Components/Prompt.jsx";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const formattedDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Helper to safely get full name from child data
const getFullName = (child) => {
  if (!child) return "N/A";
  
  const firstName = child.firstName || child.name || "";
  const lastName = child.lastName || child.surname || "";
  
  if (!firstName && !lastName) return "Unknown";
  return `${firstName} ${lastName}`.trim();
};

const PatientList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: children, isLoading: loading, refetch } = useChildrens(page);
  const { mutate: deleteChildren } = useDeleteChildren();
  const [showAddPatient, setShowAddPatient] = useState(false);
  const addPatientRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [childrenToDelete, setChildrenToDelete] = useState(null);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const filteredChildren =
    typeof children?.data?.children === "object" && Array.isArray(children?.data?.children)
      ? children?.data?.children.filter(
          (val) => {
            if (!val) return false;
            const searchString = searchTerm.toLowerCase();
            return (
              (val.firstName || "").toLowerCase().includes(searchString) ||
              (val.lastName || "").toLowerCase().includes(searchString) ||
              (val.name || "").toLowerCase().includes(searchString) ||
              (val.surname || "").toLowerCase().includes(searchString) ||
              (val.customId || "").toLowerCase().includes(searchString) ||
              (val._id || "").toLowerCase().includes(searchString)
            );
          }
        )
      : [];

  useEffect(() => {
    if (showAddPatient) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 300);
    }
  }, [showAddPatient]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addPatientRef.current && !addPatientRef.current.contains(e.target)) {
        setShowAddPatient(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = (patientId) => {
    setChildrenToDelete(patientId);
    setIsPromptOpen(true);
  };

  const confirmDelete = async () => {
    if (childrenToDelete) {
      setIsPromptOpen(false);
      const toastId = toast.loading("Deleting child...");
      await deleteChildren(childrenToDelete, {
        onSuccess: () => {
          toast.success("Child deleted successfully", { id: toastId });
          refetch();
        },
        onError: () => {
          toast.error("Error deleting child", { id: toastId });
        },
      });
    }
  };

  const columns = [
    {
      name: "Name",
      selector: row => getFullName(row),
      sortable: true,
      cell: (row) => (
        <div className="py-2 pl-1">
          <div className="font-medium text-gray-800">{getFullName(row)}</div>
          <div className="text-xs text-gray-500">{row.customId || "No ID"}</div>
        </div>
      ),
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      cell: (row) => (
        <div className="capitalize text-gray-700">
          {row.gender ? row.gender.toLowerCase() : "Not specified"}
        </div>
      ),
    },
    {
      name: "Date of Birth",
      selector: (row) => row.dataOfBirth || row.dateOfBirth,
      sortable: true,
      cell: (row) => (
        <div className="text-gray-700">{formattedDate(row.dataOfBirth || row.dateOfBirth)}</div>
      ),
    },
    {
      name: "Added On",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => (
        <div className="text-gray-700">{formattedDate(row.createdAt)}</div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/child/${row._id}`);
            }}
            className="p-2 text-primary-blue bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            aria-label="View Profile"
            title="View Profile"
          >
            <FaStethoscope size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            aria-label="Delete"
            title="Delete"
          >
            <FaTrash size={16} />
          </button>
        </div>
      ),
      button: true,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f8fafc",
        borderRadius: "8px 8px 0 0",
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
          borderRadius: "0 0 8px 8px",
        },
        "&:hover": {
          backgroundColor: "#f8fafc",
          cursor: "pointer",
        },
      },
    },
    cells: {
      style: {
        padding: "12px 16px",
      },
    },
    pagination: {
      style: {
        borderRadius: "0 0 8px 8px",
        backgroundColor: "#fff",
        border: "none",
        borderTop: "1px solid #f1f5f9",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h2 className="text-xl font-light text-gray-800 flex items-center">
            <FaUser className="mr-2 text-primary-blue" /> 
            Children
          </h2>
          <button
            onClick={() => setShowAddPatient(true)}
            className="flex items-center justify-center bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" /> Add Child
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
          
          <div className="text-sm text-gray-500 flex items-center">
            Total Children: <span className="ml-1 font-medium text-primary-blue">{children?.data?.totalChildren || 0}</span>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16">
          <ClipLoader size={40} color="#3b82f6" />
          <div className="mt-4 text-gray-600 font-light">Loading children...</div>
        </div>
      ) : filteredChildren.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="rounded-full bg-blue-50 p-4 mb-4">
            <FaUser className="text-primary-blue text-2xl" />
          </div>
          <h3 className="text-lg font-light text-gray-800 mb-2">No children found</h3>
          <p className="text-gray-500 max-w-md mb-6">
            {searchTerm ? "Try a different search term or" : "You haven't added any children yet. Get started by"} adding a child to track their health.
          </p>
          <button
            onClick={() => setShowAddPatient(true)}
            className="flex items-center justify-center bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" /> Add Child
          </button>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredChildren}
          fixedHeader
          pagination
          paginationServer
          paginationTotalRows={children?.data?.totalChildren || 0}
          paginationDefaultPage={Number(children?.data?.currentPage) || 1}
          onChangePage={(newPage) => setPage(newPage)}
          customStyles={customStyles}
          onRowClicked={(patient) => navigate(`/child/${patient._id}`)}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
        />
      )}

      {showAddPatient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            ref={addPatientRef}
            className="w-[90%] max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-xl"
          >
            <AddPatient
              refetchChildrens={refetch}
              closeModal={() => setShowAddPatient(false)}
            />
          </motion.div>
        </div>
      )}
      
      {isPromptOpen && (
        <Prompt
          isOpen={isPromptOpen}
          message="Are you sure you want to delete this child? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setIsPromptOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default PatientList;
