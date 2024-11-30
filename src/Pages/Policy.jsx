import React from "react";

const Policy = () => {
  return (
    <div className="min-h-screen  px-6 sm:px-12 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-blue mb-6 text-center">
          Nourasense Privacy Policy
        </h1>
        <p className="text-gray-500 text-center mb-8">
          <strong>Effective Date: 17 October 2024</strong>
        </p>

        <p className="text-gray-700 mb-6">
          This Privacy Policy outlines how Nourasense ("we," "us," or "our")
          collects, uses, and protects your personal information when you
          interact with our website, products, or services (collectively, the
          "Services").
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              Information We Collect
            </h2>
            <p className="text-gray-700 mt-2">
              We may collect the following types of personal information from
              you:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>
                <strong>Information you provide:</strong> This includes
                information you voluntarily provide, such as your name, email
                address, phone number, and other contact details.
              </li>
              <li>
                <strong>Information automatically collected:</strong> We may
                automatically collect information about your device, such as
                your IP address, browser type, and operating system.
              </li>
              <li>
                <strong>Information from third parties:</strong> We may obtain
                information about you from third parties, such as social media
                platforms or analytics providers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mt-2">
              We may use your personal information for the following purposes:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
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
            <h2 className="text-xl font-semibold text-primary-blue">
              Sharing Your Information
            </h2>
            <p className="text-gray-700 mt-2">
              We may share your personal information with:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>
                <strong>Third-party service providers:</strong> We may share
                your information with third-party service providers who help us
                operate our Services, such as payment processors, hosting
                providers, and analytics providers.
              </li>
              <li>
                <strong>Business partners:</strong> We may share your
                information with our business partners for marketing or other
                purposes.
              </li>
              <li>
                <strong>Legal authorities:</strong> We may share your
                information with law enforcement agencies or other legal
                authorities if required by law or to protect our rights or the
                rights of others.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              Data Security
            </h2>
            <p className="text-gray-700 mt-2">
              We implement reasonable security measures to protect your personal
              information from unauthorized access, disclosure, alteration, or
              destruction. However, no method of transmission over the internet
              or electronic storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              Your Rights
            </h2>
            <p className="text-gray-700 mt-2">
              You may have certain rights regarding your personal information,
              such as the right to access, correct, or delete your information.
              If you have any questions about your rights, please contact us at{" "}
              <a
                href="mailto:support@nourasense.com"
                className="text-primary-blue underline"
              >
                support@nourasense.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 mt-2">
              We may use cookies and other tracking technologies to collect
              information about your use of our Services. You can manage your
              cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 mt-2">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting a notice on our
              website or by contacting you directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary-blue">
              Contact Us
            </h2>
            <p className="text-gray-700 mt-2">
              If you have any questions about this Privacy Policy, please
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

export default Policy;
