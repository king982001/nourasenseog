import React, { useEffect, useState } from "react";
import { useFeedback } from "src/Hooks/Hooks.js";
import toast from "react-hot-toast";
import BackButton from "src/Components/BackButton.jsx";

const SupportPage = () => {
  const [faqState, setFaqState] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const { mutate: sendFeedback } = useFeedback();

  const handleFaqClick = (index) => {
    setFaqState((prevState) => {
      const isOpen = prevState[index];
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      newState[index] = !isOpen;
      return newState;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData ||
      !formData.name ||
      !formData.email ||
      !formData.topic ||
      !formData.message
    ) {
      return toast.error("Please fill in all fields");
    }

    const toastId = toast.loading("Please wait...");

    sendFeedback(formData, {
      onSuccess: () => {
        toast.success("Feedback successfully saved", { id: toastId });
      },
      onError: () => {
        toast.error("Oops, something went wrong", { id: toastId });
      },
    });
  };

  useEffect(() => {
    document.title = "Nourasense - Support";
    
    // Add Inter font if not already added
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  const faqItems = [
    {
      question: "What is required for a diagnosis?",
      answer:
        "After setting up your account, enter your child's or patient's anthropomorphic measurements, such as height, weight, and head circumference. Our advanced algorithms will analyze these inputs, delivering an accurate assessment of your child's growth and nutritional status in seconds.",
    },
    {
      question: "How long do I have to wait for a medical report?",
      answer:
        "The assessment of your child's growth and report is generated in seconds.",
    },
    {
      question: "How long does it take for my account to get verified?",
      answer:
        "Within 24hrs of account creation, your account will be verified.",
    },
    {
      question:
        "Can I use these medical reports with any healthcare professional?",
      answer:
        "Our system generates a comprehensive report detailing your child's growth metrics, including potential areas of concern, helping you make informed decisions about your child's health and development. Access it anytime, download, or share it with healthcare professionals directly from your dashboard.",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-['Inter']">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light mb-2 text-gray-800">Support & Contact</h1>
          <p className="mb-6 max-w-2xl mx-auto text-sm text-gray-600">
            We're here to help with any questions or concerns about NouraSense.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Contact Form */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-light mb-6 text-gray-800">Contact Us</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="topic" className="block text-sm text-gray-600 mb-1">Topic*</label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-gray-600 mb-1">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-xl font-light mb-4 text-gray-800">Get in Touch</h3>
              <p className="text-sm text-gray-600 mb-6">
                Whether it's <span className="text-blue-500">support</span> you need or <span className="text-blue-500">feedback</span> to give, 
                we are here for you. Reach out to us on the following contact lines:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Phone Support</p>
                    <p className="text-gray-600 text-sm">+91 9723964754</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Email</p>
                    <p className="text-gray-600 text-sm">support@nourasense.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Business Hours</p>
                    <p className="text-gray-600 text-sm">Monday - Friday, 9AM - 6PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-light mb-8 text-center text-gray-800">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                <button
                  className="w-full text-left p-4 bg-white flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => handleFaqClick(index)}
                >
                  <span className="font-medium text-gray-800 text-sm">{faq.question}</span>
                  <span className="text-blue-500 text-xl">
                    {faqState[index] ? 
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="12" x2="6" y2="12"></line>
                      </svg>
                      : 
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    }
                  </span>
                </button>
                {faqState[index] && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Support Banner */}
        <div className="bg-gray-50 p-8 rounded-xl text-center mb-8">
          <h3 className="text-xl font-light mb-2 text-gray-800">
            Need Additional Support?
          </h3>
          <p className="mb-4 max-w-2xl mx-auto text-sm text-gray-600">
            Our team is ready to provide personalized assistance for your specific needs.
          </p>
          <button
            className="px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200 bg-gray-900 text-white hover:bg-gray-800">
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
