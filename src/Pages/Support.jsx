import React, { useEffect, useState } from "react";
import styles from "./Support.module.css";
import phoneIcon from "src/assets/Doctor/phone.png";
import emailIcon from "src/assets/Doctor/gmail.png";
import copyrightIcon from "src/assets/Doctor/copyright.png";
import { useFeedback } from "src/Hooks/Hooks.js";
import toast from "react-hot-toast";

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
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.contactForm}>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="topic">Topic*</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
            />

            <label htmlFor="message">Message*</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className={styles.contactInfo}>
          <p className={styles.whether}>
            Whether it’s <a href="#">Support</a> you need or{" "}
            <a href="#">Feedback</a> to Give
          </p>
          <p className={styles.contactLines}>
            We are here for you. Reach out to us on the following contact lines:
          </p>
          <p className={styles.phone}>
            <img src={phoneIcon} alt="Phone" className={styles.icon} /> +91
            9723964754
          </p>
          <p className={styles.email}>
            <img src={emailIcon} alt="Email" className={styles.icon} />{" "}
            support@nourasense.com
          </p>
        </div>
      </div>

      <div className={styles.faqSection}>
        <h2>FAQs</h2>
        {[
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
              "Within 24hrs of account creation , your account will be verified.",
          },
          {
            question:
              "Can I use these medical reports with any healthcare professional?",
            answer:
              "Our system then generates a comprehensive report detailing your child's growth metrics, including potential areas of concern, helping you make informed decisions about your child's health and development. Access it anytime, download, or share it with healthcare professionals directly from your dashboard.",
          },
        ].map((faq, index) => (
          <div className={styles.faq} key={index}>
            <button
              className={styles.faqQuestion}
              onClick={() => handleFaqClick(index)}
            >
              {faq.question} <span>{faqState[index] ? "–" : "+"}</span>
            </button>
            <div
              className={styles.faqAnswer}
              style={{ display: faqState[index] ? "block" : "none" }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportPage;
