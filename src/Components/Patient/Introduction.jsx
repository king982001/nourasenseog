import React from "react";
import { useNavigate } from "react-router-dom";

const Introduction = () => {
  const account = JSON.parse(localStorage.getItem("account"));
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/updateProfile");
  };

  return (
    <div className="px-4 md:px-14 py-6 flex flex-col md:flex-row items-start md:items-center justify-between mt-8 gap-3 md:gap-0">
      {/* Greeting Section */}
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-xl md:text-3xl">
          Hello{" "}
          <span className="text-primary-blue">
            <span>{account.name || account.email}</span>
          </span>
        </h1>
        <p className="text-sm md:text-lg">
          Here is your dashboard starting with a list of all your childs
        </p>
      </div>

      {/*/!* Button Section *!/*/}
      {/*<div className="flex flex-col gap-1 items-start md:items-center justify-center">*/}
      {/*  <button*/}
      {/*    className="bg-primary-blue text-white px-5 md:px-7 py-2 text-xs md:text-sm rounded-md hover:bg-primary-blue/95"*/}
      {/*    onClick={handleProfile}*/}
      {/*  >*/}
      {/*    Update Profile*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
};

export default Introduction;
