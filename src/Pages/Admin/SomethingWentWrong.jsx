import React from "react";
import { Link } from "react-router-dom"; // Make sure you have react-router-dom installed

const SomethingWentWrong = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-white font-Inter">
      <h1 className="text-6xl font-bold text-gray-800">Something Went Wrong</h1>
      <p className="mt-4 text-xl text-gray-600">
        We&#39;re sorry, but an unexpected error occurred.
      </p>
      <p className="mt-2 text-gray-500">
        Please try again later or contact support.
      </p>
      <Link
        to="/admin"
        className="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default SomethingWentWrong;
