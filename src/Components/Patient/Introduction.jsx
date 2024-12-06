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
        <h1 className="font-serif text-4xl sm:text-6xl text-primary-blue">
          Hello
          <span className="text-primary-blue">
            <span>
              {account.name} {account?.surname}
            </span>
          </span>
        </h1>
        <p className="text-sm md:text-lg">
          Here is your dashboard starting with a list of all your childs
        </p>
      </div>
    </div>
  );
};

export default Introduction;
