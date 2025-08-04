import React, { useEffect } from "react";
import BackButton from "src/Components/BackButton.jsx";
import { Link } from "react-router-dom";

const Policy = () => {
  useEffect(() => {
    document.title = "Nourasense - Privacy Policy";
    
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
      <div className="min-h-screen px-4 sm:px-12 py-12 sm:py-14 bg-white font-['Inter']">
        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-light text-gray-800 mb-2">
              Nourasense Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm">
              <span>Effective Date: 17 October 2024</span>
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            This Privacy Policy outlines how Nourasense ("we," "us," or "our")
            collects, uses, and protects your personal information when you
            interact with our website, products, or services (collectively, the
            "Services").
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Information We Collect
              </h2>
              <p className="text-sm text-gray-600">
                We may collect the following types of personal information from
                you:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-gray-600 pl-2">
                <li>
                  <strong className="text-gray-700">Information you provide:</strong> This includes
                  information you voluntarily provide, such as your name, email
                  address, phone number, and other contact details.
                </li>
                <li>
                  <strong className="text-gray-700">Information automatically collected:</strong> We may
                  automatically collect information about your device, such as
                  your IP address, browser type, and operating system.
                </li>
                <li>
                  <strong className="text-gray-700">Information from third parties:</strong> We may obtain
                  information about you from third parties, such as social media
                  platforms or analytics providers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                How We Use Your Information
              </h2>
              <p className="text-sm text-gray-600">
                We may use your personal information for the following purposes:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-gray-600 pl-2">
                <li>To provide and improve our Services.</li>
                <li>
                  To communicate with you, such as sending you notifications or
                  marketing materials.
                </li>
                <li>To personalize your experience with our Services.</li>
                <li>To analyze and understand how our Services are used.</li>
                <li>To comply with legal requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Sharing Your Information
              </h2>
              <p className="text-sm text-gray-600">
                We may share your personal information with:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-gray-600 pl-2">
                <li>
                  <strong className="text-gray-700">Third-party service providers:</strong> We may share
                  your information with third-party service providers who help
                  us operate our Services, such as payment processors, hosting
                  providers, and analytics providers.
                </li>
                <li>
                  <strong className="text-gray-700">Business partners:</strong> We may share your
                  information with our business partners for marketing or other
                  purposes.
                </li>
                <li>
                  <strong className="text-gray-700">Legal authorities:</strong> We may share your
                  information with law enforcement agencies or other legal
                  authorities if required by law or to protect our rights or the
                  rights of others.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Data Security
              </h2>
              <p className="text-sm text-gray-600">
                We implement reasonable security measures to protect your
                personal information from unauthorized access, disclosure,
                alteration, or destruction. However, no method of transmission
                over the internet or electronic storage is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Your Rights
              </h2>
              <p className="text-sm text-gray-600">
                You may have certain rights regarding your personal information,
                such as the right to access, correct, or delete your
                information. If you have any questions about your rights, please
                contact us at{" "}
                <a
                  href="mailto:support@nourasense.com"
                  className="text-blue-500 hover:text-blue-600"
                >
                  support@nourasense.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-sm text-gray-600">
                We may use cookies and other tracking technologies to collect
                information about your use of our Services. You can manage your
                cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Changes to This Privacy Policy
              </h2>
              <p className="text-sm text-gray-600">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting a notice on our
                website or by contacting you directly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Contact Us
              </h2>
              <p className="text-sm text-gray-600">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
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

          <div className="mt-12 pt-6 border-t border-gray-100 text-center">
            <Link to="/" className="text-sm text-blue-500 hover:text-blue-600">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Policy;
