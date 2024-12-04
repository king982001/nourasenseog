import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePatients } from "src/Hooks/DoctorHooks.js";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const DiagnoseIntro = () => {
  const { id } = useParams();
  const { data, isLoading: loading, isError } = usePatients();
  const patient = data?.find((patient) => patient._id === id);
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("DoctorAccount"));
  const isDoctorApproved = account?.verified || false;
  const doctorName = account?.name?.trim() || "";
  const surName = account?.surname?.trim() || "";
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [showDiagnoseModal, setShowDiagnoseModal] = useState(false);
  const diagnoseRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showDiagnoseModal) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (diagnoseRef.current && !diagnoseRef.current.contains(e.target)) {
        setShowDiagnoseModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <h1 className="flex justify-center items-center w-full h-[100vh] text-lg">
        <ClipLoader />
      </h1>
    );
  }
  if (!patient) {
    return <h1 className="text-center text-lg">Patient not found</h1>;
  }

  const navigateToDiagnosos = (id) => {
    if (!isDoctorApproved)
      return toast.error(
        "You're not approved yet. so you cannot access this feature.",
      );
    navigate(`/doctor/diagnose/${id}`, { state: { isApproved: true } });
  };

  return (
    <div className="px-6 py-3 sm:px-10 sm:py-7 md:px-14 md:py-9">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h1 className="font-serif text-2xl sm:text-3xl">
            Hello{" "}
            <span className="text-primary-blue">
              Dr. {doctorName} {surName}
            </span>
          </h1>
          <p className="text-base sm:text-lg">
            Welcome to {`${patient.name} ${patient.surname}`} profile
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-serif text-lg sm:text-xl">
            Today: <span>{formattedDate}</span>
          </p>
          <p className="font-serif text-lg sm:text-xl">
            Last Diagnosis: <span>October 23, 2024</span>
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-primary-blue text-white px-10 py-2 text-sm sm:px-12 sm:py-3 sm:text-lg rounded-md hover:bg-primary-blue/95"
            onClick={() => navigateToDiagnosos(id)}
          >
            Diagnose
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnoseIntro;
