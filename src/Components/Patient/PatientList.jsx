import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import Search from "src/assets/Patient/Search.svg";
import User from "src/assets/Patient/User.svg";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useChildrens } from "src/Hooks/PatientHooks.js";
import AddPatient from "src/Components/Patient/AddPatient.jsx";
import { FaStethoscope } from "react-icons/fa6";

const formattedDate = () => {
  return new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const PatientList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: children, isLoading: loading, refetch } = useChildrens(page);
  const [showDiagnose, setShowDiagnose] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const addDiagnoseRef = useRef(null);
  const addPatientRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    refetch(); // Trigger refetch when page changes
  }, [page, refetch]);

  // Filter the children based on search term
  const filteredChildren =
    typeof children?.data.children === "object"
      ? children?.data.children.filter(
          (val) =>
            val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val._id.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];

  useEffect(() => {
    if (showAddPatient || showDiagnose) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 300);
    }
  }, [showAddPatient, showDiagnose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (addPatientRef.current && !addPatientRef.current.contains(e.target)) ||
        (addDiagnoseRef.current && !addDiagnoseRef.current.contains(e.target))
      ) {
        setShowAddPatient(false);
        setShowDiagnose(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      style: {
        fontWeight: "500",
      },
    },
    {
      name: "Child ID",
      selector: (row) => row.customId || "N/A",
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Created At",
      selector: (row) => formattedDate(row.createdAt),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => navigate(`/child/${row._id}`)}
          className="text-blue-500 hover:text-blue-600 p-2 rounded-full"
          aria-label="Diagnose Patient"
          title="Diagnose"
        >
          <FaStethoscope size={20} />
        </button>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "#EEEEEE",
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "12px",
        paddingBottom: "12px",

        fontSize: "14px",
      },
    },
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Update the current page
  };

  return (
    <div className="relative px-4 md:px-14 py-10">
      <div className="flex flex-col">
        <h1 className="font-serif text-xl md:text-2xl font-semibold text-center md:text-left">
          Childrens
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4 md:gap-0">
          <div className="input flex items-center p-[12px] px-4 border border-[#B0B0B0] rounded-md bg-white cursor-text w-full md:max-w-xs">
            <img className="h-6 w-6" src={Search} alt="Search Icon" />
            <input
              type="text"
              placeholder="Search by name or ID"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="w-full  text-sm outline-none px-2 !mt-0 !border-none bg-transparent"
            />
          </div>
          <div
            className={
              "flex w-full justify-between sm:w-[55%] sm:justify-between"
            }
          >
            <div className="flex items-center gap-2">
              <img src={User} alt="User Icon" className="h-6 w-6" />
              <h1 className="font-serif text-sm md:text-base">
                <span>
                  {typeof children?.data.children === "object"
                    ? children?.data?.totalChildren
                    : 0}
                </span>{" "}
                Total Childrens
              </h1>
            </div>
            <button
              className="bg-primary-blue text-white px-8 md:px-12 py-2 text-sm md:text-lg rounded-md hover:bg-primary-blue/95"
              onClick={() => setShowAddPatient(true)}
            >
              Add Child
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <ClipLoader size={50} color="#3498db" />
            <div className="mt-4 text-lg font-medium text-gray-600">
              Loading patients, please wait...
            </div>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredChildren}
            fixedHeader
            pagination
            paginationServer
            paginationComponentOptions={{
              noRowsPerPage: true, // Disable "Rows per page"
            }}
            paginationTotalRows={children?.data?.totalChildren || 0}
            paginationDefaultPage={Number(children?.data?.currentPage) || 1}
            onChangePage={(newPage) => handlePageChange(newPage)}
            responsive
            pointerOnHover
            customStyles={customStyles}
            onRowClicked={(patient) => navigate(`/child/${patient._id}`)}
          />
        )}
      </div>

      {showAddPatient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div
            ref={addPatientRef}
            className="w-[90%] h-[80%] md:w-[60%] lg:w-[50%] overflow-auto"
          >
            <AddPatient
              refetchChildrens={refetch}
              closeModal={() => setShowAddPatient(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
