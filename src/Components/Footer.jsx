import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <FaRegCopyright className="text-primary-blue text-lg" />
          <p className="text-sm text-gray-600">
            Copyright <span className="font-semibold">Nourasense 2024</span>.
            All Rights Reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="text-sm text-gray-600">
          <p>
            Designed and maintained by{" "}
            <a
              href="https://nourasense.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:underline"
            >
              Nourasense
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
