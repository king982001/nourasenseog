import React, { useEffect } from "react";
import EmptyHead from "src/Components/EmptyHead.jsx";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Nourasense - Not Found";
    
    // Add Inter font if not already added
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    return () => {
      // Clean up the font link if this component added it
      if (document.head.contains(fontLink)) {
        document.head.removeChild(fontLink);
      }
    };
  }, []);

  return (
    <>
      <EmptyHead />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white font-['Inter']">
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl font-light text-blue-500">404</span>
          </div>
          
          <h1 className="text-2xl font-light mb-3 text-gray-800">Page Not Found</h1>
          
          <p className="text-sm text-gray-600 mb-8">
            We're sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm"
            >
              Go to Homepage
            </Link>
            
            <Link
              to="/support"
              className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
            >
              Contact Support
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? <Link to="/support" className="text-blue-500 hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
