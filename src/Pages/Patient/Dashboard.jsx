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
    <div className={"min-h-[100vh]"}>
      <Introduction />
      <PatientList />
    </div>
  );
};

export default ParentMainDashboard;
