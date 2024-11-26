import React from "react";
import Copyright from "/src/assets/Doctor/Copyright.svg";
const Footer = () => {
  return (
    <div className="flex items-center justify-center mt-20 mb-20 gap-1">
      <img src={Copyright} alt="" />
      <h2>Copyright Nourasense 2024 . All Rights Reserved.</h2>
    </div>
  );
};
export default Footer;
