import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useDeletePatient, usePatients } from "src/Hooks/DoctorHooks.js";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import Prompt from "../Prompt.jsx";
import { FaCalendarPlus, FaStethoscope, FaSearch, FaUserAlt } from "react-icons/fa";
import AddPatient from "./AddPatient.jsx";
import CreateAppointmentModal from "./CreateAppointmentModal.jsx";
import { motion } from "motion/react";

const PatientList = ({ onStartDiagnosis }) => {
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
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  useEffect(() => {
    refetch();
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
      setIsPromptOpen(false);
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
    setPatientToDelete(patientId);
    setIsPromptOpen(true);
  };

  const navigateToPatientProfile = (patientId) => {
    navigate(`/doctor/patient/${patientId}`);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.name} ${row.surname}`,
      style: {
        fontWeight: "300",
        fontSize: "0.95rem",
      },
    },
    {
      name: "Patient ID",
      selector: (row) => row.customId,
      style: {
        fontWeight: "300",
        fontSize: "0.95rem",
      },
    },
    {
      name: "DoB",
      selector: (row) => row.date_of_birth,
      style: {
        fontWeight: "300",
        fontSize: "0.95rem",
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-center space-x-3">
          <button
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateToPatientProfile(row._id);
            }}
            aria-label="View Patient"
            title="View Patient"
          >
            <FaUserAlt size={16} />
          </button>
         
          <button
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
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
            <FaCalendarPlus size={16} />
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            aria-label="Delete Patient"
            title="Delete"
          >
            <FaTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
      },
    },
    headCells: {
      style: {
        padding: '16px',
        fontWeight: '300',
        fontSize: '0.875rem',
        color: '#4b5563',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },
    rows: {
      style: {
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#f9fafb',
          cursor: 'pointer',
        },
      },
    },
    cells: {
      style: {
        padding: '16px',
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #e5e7eb',
        padding: '16px',
      },
    },
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-full">
      {/* Header and controls */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-0 focus:border-gray-300 text-sm font-light"
          />
        </div>
        
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center space-x-2 text-gray-500 mr-4">
            <FaUserAlt size={14} />
            <span className="text-sm font-light">
              {patient?.data?.totalPatients || 0} Patients
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddPatient(true)}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-light transition-colors"
          >
            Add Patient
          </motion.button>
        </div>
      </div>

      {/* Patient table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ClipLoader size={40} color="#9ca3af" />
          <p className="mt-4 text-gray-500 font-light">Loading patients...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm">
          <DataTable
            columns={columns}
            data={fetchedPatients}
            pagination
            paginationServer
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            paginationTotalRows={patient?.data?.totalPatients || 0}
            paginationDefaultPage={Number(patient?.data?.currentPage) || 1}
            onChangePage={handlePageChange}
            onRowClicked={(patient) => navigateToPatientProfile(patient._id)}
            noDataComponent={
              <div className="p-8 text-center text-gray-500 font-light">
                No patients found
              </div>
            }
            customStyles={customStyles}
          />
        </div>
      )}

      {/* Modals */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            ref={addPatientRef}
            className="w-full max-w-2xl max-h-[90vh] overflow-auto"
          >
            <AddPatient
              closeModal={() => setShowAddPatient(false)}
              refetchPatients={refetch}
            />
          </motion.div>
        </div>
      )}
      
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            ref={addAppointmentRef}
            className="w-full max-w-2xl overflow-auto"
          >
            <CreateAppointmentModal
              patientData={patientData}
              closeModal={() => setShowAddAppointment(false)}
            />
          </motion.div>
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
