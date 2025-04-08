import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Search from "src/assets/Doctor/Search.svg";
import User from "src/assets/Doctor/User.svg";
import AddPatient from "./AddPatient.jsx";
import { useNavigate } from "react-router-dom";
import CreateAppointmentModal from "./CreateAppointmentModal.jsx";
import { useDeletePatient, usePatients } from "src/Hooks/DoctorHooks.js";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import Prompt from "../Prompt.jsx";
import { FaCalendarPlus, FaStethoscope } from "react-icons/fa6"; // Import the Prompt component

const PatientList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const {
    data: patient,
    isLoading: loading,
    isError,
    refetch,
  } = usePatients(page);
  const [showDiagnose, setShowDiagnose] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const addDiagnoseRef = useRef(null);
  const addPatientRef = useRef(null);
  const addAppointmentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientData, setPatientData] = useState({
    patientId: "",
    patientName: "",
    patientSurname: "",
  });

  const { mutate: deletePatient } = useDeletePatient();
  const [isPromptOpen, setIsPromptOpen] = useState(false); // State for Prompt modal
  const [patientToDelete, setPatientToDelete] = useState(null); // State for selected patient ID

  useEffect(() => {
    refetch(); // Trigger refetch when page changes
  }, [page, refetch]);

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
        (addDiagnoseRef.current &&
          !addDiagnoseRef.current.contains(e.target)) ||
        (addAppointmentRef.current &&
          !addAppointmentRef.current.contains(e.target))
      ) {
        setShowAddPatient(false);
        setShowDiagnose(false);
        setShowAddAppointment(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchedPatients = patient?.data?.patients.filter(
    (val) =>
      val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = () => {
    if (patientToDelete) {
      setIsPromptOpen(false); // Close the Prompt modal after deletion
      deletePatient(patientToDelete, {
        onMutate: () => {
          toast.loading("Deleting patient. Please wait...");
        },
        onSuccess: () => {
          toast.success("Patient deleted successfully.");
          refetch();
        },
        onError: () => {
          toast.error("Error deleting patient");
        },
      });
    }
  };

  const handleDelete = (patientId) => {
    setPatientToDelete(patientId); // Set the selected patient ID
    setIsPromptOpen(true); // Open the Prompt modal
  };

  const navigateToPatientProfile = (patientId) => {
    navigate(`/doctor/patient/${patientId}`);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.name} ${row.surname}`,
      style: {
        fontWeight: "500",
        fontSize: "1rem", // Increased font size
      },
    },
    {
      name: "Patient ID",
      selector: (row) => row.customId,
      style: {
        fontWeight: "500",
        fontSize: "1rem", // Increased font size
      },
    },
    {
      name: "DoB",
      selector: (row) => row.date_of_birth,
      style: {
        fontWeight: "500",
        fontSize: "1rem", // Increased font size
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-center space-x-4">
          {/* Diagnose Button */}
          <button
            className="text-blue-500 hover:text-blue-600 p-2 rounded-full"
            onClick={() => navigateToPatientProfile(row._id)}
            aria-label="Diagnose Patient"
            title="Diagnose"
          >
            <FaStethoscope size={20} /> {/* Icon for Diagnose */}
          </button>

          {/* Add Appointment Button */}
          <button
            className="text-green-500 hover:text-green-600 p-2 rounded-full"
            onClick={() => {
              setShowAddAppointment(true);
              setPatientData({
                patientId: row._id,
                patientName: row.name,
                patientSurname: row.surname,
              });
            }}
            aria-label="Add Appointment"
            title="Add Appointment"
          >
            <FaCalendarPlus size={20} /> {/* Icon for Add Appointment */}
          </button>

          {/* Delete Button */}
          <button
            className="text-red-500 hover:text-red-600 p-2 rounded-full"
            onClick={() => handleDelete(row._id)}
            aria-label="Delete Patient"
            title="Delete"
          >
            <FaTrash size={20} /> {/* Icon for Delete */}
          </button>
        </div>
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
          Patients
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
                <span>{patient?.data?.totalPatients || 0}</span> Total Patients
              </h1>
            </div>
            <button
              className="bg-primary-blue text-white px-8 md:px-12 py-2 text-sm md:text-lg rounded-md hover:bg-primary-blue/95"
              onClick={() => setShowAddPatient(true)}
            >
              Add Patient
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
            data={fetchedPatients}
            fixedHeader
            pagination
            paginationServer
            paginationComponentOptions={{
              noRowsPerPage: true, // Disable "Rows per page"
            }}
            paginationTotalRows={patient?.data?.totalPatients || 0}
            paginationDefaultPage={Number(patient?.data?.currentPage) || 1}
            onChangePage={(newPage) => handlePageChange(newPage)}
            responsive
            pointerOnHover
            customStyles={customStyles}
            onRowClicked={(patient) => navigateToPatientProfile(patient._id)}
          />
        )}
      </div>

      {showAddPatient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div
            ref={addPatientRef}
            className="w-[90%] h-[80%] md:h-[85%] lg:h-[95%] md:w-[60%] lg:w-[50%] overflow-auto"
          >
            <AddPatient
              closeModal={() => setShowAddPatient(false)}
              refetchPatients={refetch}
            />
          </div>
        </div>
      )}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div
            ref={addAppointmentRef}
            className="w-[90%] md:w-[60%] lg:w-[50%] overflow-auto"
          >
            <CreateAppointmentModal
              patientData={patientData}
              closeModal={() => setShowAddAppointment(false)}
            />
          </div>
        </div>
      )}
      {isPromptOpen && (
        <Prompt
          isOpen={isPromptOpen}
          message="Are you sure you want to delete this patient?"
          onConfirm={confirmDelete}
          onCancel={() => setIsPromptOpen(false)}
        />
      )}
    </div>
  );
};

export default PatientList;
