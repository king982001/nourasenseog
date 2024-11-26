import React, { useEffect, useState } from "react";
import styles from "./Support.module.css";
import phoneIcon from "/src/assets/Doctor/phone.png";
import emailIcon from "/src/assets/Doctor/gmail.png";
import copyrightIcon from "/src/assets/Doctor/copyright.png";

const SupportPage = () => {
  const [faqState, setFaqState] = useState({});

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

  useEffect(() => {
    document.title = "Nourasense - Support";
  }, []);

  return (
    <div>
      <div className={styles.header}></div>

      <div className={styles.container}>
        <div className={styles.contactForm}>
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="name">Name*</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email*</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="topic">Topic</label>
            <input type="text" id="topic" name="topic" />

            <label htmlFor="message">Message*</label>
            <textarea id="message" name="message" required></textarea>

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

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          <img
            src={copyrightIcon}
            alt="Copyright"
            className={styles.copyrightIcon}
          />{" "}
          Copyright Nourasense 2024 . All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default SupportPage;
