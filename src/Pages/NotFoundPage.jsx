import React, { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Nourasense - Not Found";
  }, []);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center font-sans">
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-[#002F88]">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          className="w-full py-3 bg-[#002F88] text-white font-semibold rounded-md hover:bg-[#002277] transition"
          onClick={() => (window.location.href = "/")}
        >
          Go to Homepage
        </button>
      </div>
      <footer className="text-sm text-gray-600 mt-6">
        <p className="mb-2">
          If you believe this is a mistake, contact us at{" "}
          <a
            href="mailto:support@nourasense.com"
            className="text-[#1261F5] font-semibold hover:underline"
          >
            support@nourasense.com
          </a>
        </p>
        <p>
          &copy; 2024{" "}
          <a href="/" className="text-[#1261F5] font-semibold hover:underline">
            Nourasense
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
