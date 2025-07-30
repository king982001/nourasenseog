import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ApprovedRoute = ({ isApproved }) => {
  return isApproved ? <Outlet /> : <Navigate to="/doctor" />;
};

export default ApprovedRoute;
