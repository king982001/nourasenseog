import { useNavigate, useParams } from "react-router-dom";
import {
  useDoctorById,
  useRejectDoctor,
  useVerifyDoctor,
} from "src/Hooks/AdminHooks.js";
import { ClipLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import SomethingWentWrong from "src/Pages/Admin/SomethingWentWrong.jsx";
import formatDate from "src/Utilities/Admin/formatDate.js";
import toast from "react-hot-toast";
import Prompt from "src/Components/Prompt.jsx";

export const VerifyDoctor = () => {
  const { doctorID } = useParams();
  const { data, isLoading, isError } = useDoctorById(doctorID);
  const mutation = useVerifyDoctor();
  const doctor = data?.data?.doctor;
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [doctorToVerify, setDoctorToVerify] = useState(null);
  const { mutate: rejectDoctor } = useRejectDoctor();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Nourasense - VerifyDoctor";
  }, []);

  if (isLoading) {
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

  if (isError || !doctor) {
    return <SomethingWentWrong />;
  }

  const handleVerify = (doctorId) => {
    setDoctorToVerify(doctorId);
    setIsPromptOpen(true);
  };

  const onConfirmPrompt = () => {
    const id = toast.loading("Please wait!");
    setIsPromptOpen(false);
    mutation.mutate(doctorToVerify, {
      onSuccess: (response) => {
        toast.success("Doctor verified successfully!", { id });
      },
      onError: (error) => {
        toast.error("Something went wrong! please try again", { id });
        console.log("Doctor verify error", error);
      },
    });
  };

  const handleReject = (doctorId) => {
    const toastId = toast.loading("Please wait!");
    rejectDoctor(doctorId, {
      onSuccess: () => {
        toast("Rejected Doctor", { id: toastId });
        navigate("/admin/");
      },
      onError: (error) => {
        toast.error("Something went wrong! please try again", { id: toastId });
      },
    });
  };

  const onCancelPrompt = () => {
    setIsPromptOpen(false);
    setDoctorToVerify(null);
  };

  return (
    <div
      className={
        "w-full h-full px-4 md:px-6 lg:px-8 mt-8 flex flex-col items-center pt-3 pb-28"
      }
    >
      <div
        className={"flex flex-col w-full justify-center items-center gap-y-3"}
      >
        <p
          className={
            "font-Inter sm:font-Ledger text-base sm:text-xl font-semibold "
          }
        >
          Dr {doctor.name} {doctor.surname} Registration Information
        </p>
        <p className={"font-Inter text-[#666] text-base"}>
          Submitted on: {formatDate(doctor.updatedAt)}
        </p>
      </div>

      <div
        className={
          "flex w-full md:w-[85%] mt-8  flex-col justify-center items-center"
        }
      >
        <div
          className={
            "w-full flex flex-col md:flex-row  bg-[#F0F0F0] justify-between p-4"
          }
        >
          <div className={"md:w-[40%] flex  justify-between"}>
            <p className={"font-Ledger font-semibold"}>Name</p>
            <p className={"font-Inter"}>
              {doctor.name} {doctor.surname}
            </p>
          </div>
          <div className={"md:w-[40%] flex justify-between"}>
            <p className={"font-Ledger font-semibold"}>Date of birth</p>
            <p className={"font-Inter"}>{doctor.date_of_birth}</p>
          </div>
        </div>
        <div
          className={
            "w-full flex flex-col md:flex-row bg-[#FFF] justify-between p-4 space-y-4 md:space-y-0"
          }
        >
          <div
            className={
              "w-full md:w-[40%] flex flex-col md:flex-row  md:justify-between"
            }
          >
            <p className={"font-Ledger font-semibold text-left md:text-right"}>
              Establishment Name
            </p>
            <p className={"font-Inter text-left md:text-right"}>
              {doctor?.registration?.establishment_name}
            </p>
          </div>
          <div
            className={
              "w-full md:w-[40%] flex flex-col md:flex-row justify-between"
            }
          >
            <p className={"font-Ledger font-semibold text-left md:text-right"}>
              Registration Council
            </p>
            <p className={"font-Inter text-left md:text-right"}>
              {doctor?.registration?.registration_council}
            </p>
          </div>
        </div>
        <div
          className={
            "w-full flex flex-col md:flex-row  bg-[#F0F0F0] justify-between p-4"
          }
        >
          <div className={"md:w-[40%] flex  justify-between"}>
            <p className={"font-Ledger font-semibold"}>Registration Year</p>
            <p className={"font-Inter"}>
              {doctor?.registration?.registration_year || "Not available"}
            </p>
          </div>
          <div className={"md:w-[40%] flex justify-between"}>
            <p className={"font-Ledger font-semibold"}>Registration Year</p>
            <p className={"font-Inter"}>
              {" "}
              {doctor?.registration?.registration_number || "Not available"}
            </p>
          </div>
        </div>
      </div>

      <div
        className={
          "w-full md:w-[90%] flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row justify-center items-center lg:justify-around mt-10 "
        }
      >
        <div className={"flex flex-col gap-y-2"}>
          <p className={"font-Ledger font-semibold"}>Government Issued ID</p>
          <img
            src={doctor?.registration?.id_image}
            className={"w-[600px] h-[400px] object-cover object-center"}
            alt="Govt Id"
          />
        </div>
        <div className={"flex flex-col gap-y-2"}>
          <p className={"font-Ledger font-semibold"}>Medical License</p>
          <img
            src={doctor?.registration?.selfie_image}
            className={"w-[600px] h-[400px] object-cover object-center"}
            alt="Medical Id"
          />
        </div>
      </div>

      <div
        className={
          "w-full mt-8 md:w-[30%] flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-around items-center font-Inter font-semibold"
        }
      >
        <button
          className={"bg-[#002F88] py-2 px-16 text-white"}
          onClick={() => handleVerify(doctor._id)}
        >
          Verify
        </button>
        <button
          className={"bg-[#DADADA] py-2 px-16 text-black"}
          onClick={() => handleReject(doctor._id)}
        >
          Reject
        </button>
      </div>
      {isPromptOpen && (
        <Prompt
          isOpen={isPromptOpen}
          message={"Are you sure you want to verify this doctor?"}
          title={"Verify Doctor"}
          onConfirm={onConfirmPrompt}
          onCancel={onCancelPrompt}
        />
      )}
    </div>
  );
};
