import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Nourasense - Terms and Conditions";
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    return () => {
      if (document.head.contains(fontLink)) {
        document.head.removeChild(fontLink);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar */}
      <div className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-100">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo-blue.png" alt="Nourasense" className="h-5 w-auto sm:h-6 sm:w-auto md:h-7 md:w-auto lg:h-6 lg:w-auto" />
        </Link>
        <Link 
          to="/" 
          className="text-sm text-gray-600 hover:text-primary-blue flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="flex-grow px-4 sm:px-12 py-12 sm:py-14">
        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-light text-gray-800 mb-2">
              Terms and Conditions
            </h1>
            <p className="text-gray-500 text-sm">
              Please read these terms carefully before using the Nourasense Web Application.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                1. Acceptance
              </h2>
              <p className="text-sm text-gray-600">
                By accessing or using the Nourasense Web Application (the
                "Application"), you agree to be bound by these Terms and
                Conditions. If you do not agree to these terms, please do not
                use the Application.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                2. User Eligibility
              </h2>
              <p className="text-sm text-gray-600">
                <strong className="text-gray-700">Doctors:</strong> You must be a licensed medical
                professional to use the Application.
                <br />
                <strong className="text-gray-700">Guardians:</strong> You must be at least 18 years of age
                to use the Application.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                3. Account Creation
              </h2>
              <p className="text-sm text-gray-600">
                You may be required to create an account to use certain features
                of the Application. You are responsible for maintaining the
                confidentiality of your account information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                4. User Conduct
              </h2>
              <p className="text-sm text-gray-600">
                You agree to use the Application in accordance with all
                applicable laws and regulations. You will not use the
                Application for any unlawful or prohibited purpose. You will not
                use the Application in a way that could damage, disable,
                overburden, or impair the Application or interfere with any
                other person's use of the Application.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                5. Intellectual Property
              </h2>
              <p className="text-sm text-gray-600">
                The Application and its contents, including but not limited to
                text, graphics, logos, and software, are the property of
                Nourasense and are protected by copyright and other intellectual
                property laws. You may not reproduce, modify, distribute, or
                display the Application or its contents without the prior
                written consent of Nourasense.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                6. Disclaimer of Warranties
              </h2>
              <p className="text-sm text-gray-600">
                The Application is provided on an "as is" and "as available"
                basis, without warranties of any kind, either express or
                implied. Nourasense does not warrant that the Application will
                be error-free, uninterrupted, or secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                7. Limitation of Liability
              </h2>
              <p className="text-sm text-gray-600">
                In no event shall Nourasense be liable for any damages
                whatsoever, including without limitation, direct, indirect,
                incidental, consequential, or punitive damages, arising out of
                or in connection with your use of the Application.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                8. Governing Law
              </h2>
              <p className="text-sm text-gray-600">
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of India Jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                9. Changes
              </h2>
              <p className="text-sm text-gray-600">
                Nourasense may modify these Terms and Conditions from time to
                time. Your continued use of the Application after such
                modifications constitutes your acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                10. Contact Information
              </h2>
              <p className="text-sm text-gray-600">
                If you have any questions about these Terms and Conditions,
                please contact us at{" "}
                <a
                  href="mailto:support@nourasense.com"
                  className="text-blue-500 hover:text-blue-600"
                >
                  support@nourasense.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
