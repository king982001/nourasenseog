import React from "react";
import Footer from "src/Components/Footer.jsx";
import Introduction from "src/Components/Patient/Introduction.jsx";
import PatientList from "src/Components/Patient/PatientList.jsx";
import { useNavigate } from "react-router-dom";

const ParentMainDashboard = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    navigate("/login");
  };
  return (
    <div className={"h-[100vh]"}>
      <div className="flex justify-end my-3 md:my-5">
        <button
          className="logout-btn bg-white border border-red-600 font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-colors h-10 p-2 mx-6 md:h-10 md:px-4 md:py-2 md:mx-8 text-center rounded"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <Introduction />
      <PatientList />
    </div>
  );
};

export default ParentMainDashboard;
