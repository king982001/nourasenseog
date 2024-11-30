import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white px-6 sm:px-12 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-blue mb-6 text-center">
          Terms and Conditions
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Please read these terms carefully before using the Nourasense Web
          Application.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              1. Acceptance
            </h2>
            <p className="text-gray-700 mt-2">
              By accessing or using the Nourasense Web Application (the
              "Application"), you agree to be bound by these Terms and
              Conditions. If you do not agree to these terms, please do not use
              the Application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              2. User Eligibility
            </h2>
            <p className="text-gray-700 mt-2">
              <strong>Doctors:</strong> You must be a licensed medical
              professional to use the Application.
              <br />
              <strong>Guardians:</strong> You must be at least 18 years of age
              to use the Application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              3. Account Creation
            </h2>
            <p className="text-gray-700 mt-2">
              You may be required to create an account to use certain features
              of the Application. You are responsible for maintaining the
              confidentiality of your account information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              4. User Conduct
            </h2>
            <p className="text-gray-700 mt-2">
              You agree to use the Application in accordance with all applicable
              laws and regulations. You will not use the Application for any
              unlawful or prohibited purpose. You will not use the Application
              in a way that could damage, disable, overburden, or impair the
              Application or interfere with any other person's use of the
              Application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              5. Intellectual Property
            </h2>
            <p className="text-gray-700 mt-2">
              The Application and its contents, including but not limited to
              text, graphics, logos, and software, are the property of
              Nourasense and are protected by copyright and other intellectual
              property laws. You may not reproduce, modify, distribute, or
              display the Application or its contents without the prior written
              consent of Nourasense.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 mt-2">
              The Application is provided on an "as is" and "as available"
              basis, without warranties of any kind, either express or implied.
              Nourasense does not warrant that the Application will be
              error-free, uninterrupted, or secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 mt-2">
              In no event shall Nourasense be liable for any damages whatsoever,
              including without limitation, direct, indirect, incidental,
              consequential, or punitive damages, arising out of or in
              connection with your use of the Application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              8. Governing Law
            </h2>
            <p className="text-gray-700 mt-2">
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of India Jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              9. Changes
            </h2>
            <p className="text-gray-700 mt-2">
              Nourasense may modify these Terms and Conditions from time to
              time. Your continued use of the Application after such
              modifications constitutes your acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              10. Contact Information
            </h2>
            <p className="text-gray-700 mt-2">
              If you have any questions about these Terms and Conditions, please
              contact us at{" "}
              <a
                href="mailto:support@nourasense.com"
                className="text-primary-blue underline"
              >
                support@nourasense.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
