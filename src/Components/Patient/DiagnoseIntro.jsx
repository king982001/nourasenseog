import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useChildrenById, useChildrens } from "src/Hooks/PatientHooks.js";

const DiagnoseIntro = () => {
  const { id } = useParams();
  const { data: patient, isLoading: loading, isError } = useChildrenById(id);
  const account = JSON.parse(localStorage.getItem("account"));
  const navigate = useNavigate();
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
    navigate(`/child/diagnose/${id}`);
  };

  return (
    <div className="px-6 py-3 sm:px-10 sm:py-7 md:px-14 md:py-9">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h1 className="font-serif text-2xl lg:text-3xl">
            Hello{" "}
            <span className="text-primary-blue">
              <span>
                {account.name} {account?.surname}
              </span>
            </span>
          </h1>
          <p className="text-base sm:text-lg">
            Welcome to{" "}
            <span
              className={"font-medium text-primary-blue"}
            >{`${patient.firstName} ${patient.lastName}`}</span>{" "}
            profile
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-serif text-lg sm:text-xl font-medium">
            Today: <span>{formattedDate}</span>
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
