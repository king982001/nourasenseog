import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiLogIn,
  FiUserPlus,
  FiHelpCircle,
  FiUsers,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";
import styles from "./Doctor/LandingPage.module.css";

import heroImage1 from "/src/assets/Doctor/1.png";
import heroImage2 from "/src/assets/Doctor/2.png";
import heroImage3 from "/src/assets/Doctor/3.png";
import backgroundSvg from "/src/assets/Doctor/svg.svg";
import {
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";

import RoleSelectionModal from "src/Components/RoleSelectionModal.jsx";
import EmptyHead from "src/Components/EmptyHead.jsx";

const phoneNumber = "+91 9723964754";
const emailAddress = "support@nourasense.com";
const instaLink = "https://www.Instagram.com/nourasense_co";
const linkedIn = "https://www.linkedin.com/company/nourasense";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal
  const [action, setAction] = useState("signup");
  useEffect(() => {
    document.title = "Nourasense";
  }, []);

  const openModal = (action) => {
    switch (action) {
      case "signup":
        setAction("signup");
        break;
      case "login":
        setAction("login");
        break;
      default:
        setAction("signup");
        break;
    }
    setIsModalOpen(true);
  };

  const handleRoleSelection = (role) => {
    if (action === "signup") {
      if (role === "doctor") {
        navigate("/doctor/signup"); // Update route for doctor registration
      } else {
        navigate("/signup"); // Update route for user registration
      }
    } else if (action === "login") {
      if (role === "doctor") {
        navigate("/doctor/login"); // Doctor login
      } else {
        navigate("/login"); // General login
      }
    }
  };

  const menuItems = [
    {
      name: "Doctor Login",
      link: "/doctor/login", // Adjust the URL path according to your routes
      icon: FiUsers,
    },
    {
      name: "Doctor Sign Up",
      link: "/doctor/signup", // Adjust the URL path according to your routes
      icon: FiUser,
    },
    {
      name: "Parent Login",
      link: "/login", // Adjust the URL path according to your routes
      icon: FiLogIn,
    },
    {
      name: "Parent Sign Up",
      link: "/signup", // Adjust the URL path according to your routes
      icon: FiUserPlus,
    },
    {
      name: "Pricing",
      link: "/pricing",
      icon: FiDollarSign,
    },
    {
      name: "Support",
      link: "/support", // Adjust the URL path according to your routes
      icon: FiHelpCircle,
    },
  ];

  return (
    <div>
      <EmptyHead showNavigation={true} menuItems={menuItems} />

      <div className={styles.heroSection} style={{ marginLeft: 0 }}>
        <div className={styles.heroContent}>
          <h1>
            Join NouraSense & Transform Child <b>Growth Monitoring</b>
          </h1>
          <p>
            Be a part of the revolution in child healthcare with{" "}
            <b>NouraSense</b>. Our innovative platform empowers you to track,
            diagnose, and optimize child growth with precision and ease. Join us
            in shaping a healthier future for children, where advanced
            diagnostics and personalized care are at your fingertips.
          </p>
          <a className={styles.ctaButton} onClick={() => openModal("signup")}>
            Create account
          </a>
        </div>
        <div className={styles.heroImage}>
          <img src={heroImage1} alt="" />
          <div className={styles.centered}>
            Empowering parents and pediatricians with AI- <br /> driven insights
            for healthier, happier children.
          </div>
        </div>
      </div>

      <div className={styles.backgroundSection}>
        <img src={backgroundSvg} alt="" />
        <h2 className={styles.sectionHeading} id="sec-1">
          What are we solving?
        </h2>
        <div className={styles.contentContainer}>
          <div className={styles.contentItem}>
            <h3>Undetected Growth Issues</h3>
            <p>
              Millions of children worldwide face growth-related challenges, but
              many of these issues go unnoticed until they become severe.
            </p>
          </div>
          <div className={styles.contentItem}>
            <h3>Inconsistent Diagnostics</h3>
            <p>
              Traditional growth monitoring methods can be inconsistent and are
              often limited by access to healthcare professionals.
            </p>
          </div>
          <div className={styles.contentItem}>
            <h3>Complexity of Interpreting Growth Data</h3>
            <p>
              Interpreting growth data requires specialized knowledge, and
              understanding how a child{"'"}s measurements compare to standard
              growth charts can be overwhelming.
            </p>
          </div>
          <div className={styles.contentItem}>
            <h3>Need for Actionable Reports</h3>
            <p>
              Without clear, personalized reports, important health issues may
              go unaddressed, affecting the child{"'"}s long-term well-being.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <img src={heroImage2} alt="" />
        </div>
        <div className={styles.heroContent}>
          <h1>Fast, Automatic Diagnoses</h1>
          <p>
            Get accurate health assessments in seconds. Our advanced algorithms
            analyze critical growth indicators to provide immediate diagnostic
            results, eliminating the need for lengthy manual calculations.
            Whether you{"'"}re a healthcare professional or a concerned parent,
            our automated system ensures you have the insights you need when you
            need them, empowering quick and informed decisions.
          </p>
          <a className={styles.ctaButton} onClick={() => openModal("signup")}>
            Create account
          </a>
        </div>
      </div>

      <div className={styles.heroSection} style={{ marginBottom: "0px" }}>
        <div className={styles.heroImage}>
          <img src={heroImage3} alt="" />
        </div>
        <div className={styles.heroContent}>
          <h1>Tailored Medical Reporting</h1>
          <p>
            Every child is unique, and so are their health needs. Our platform
            generates personalized medical reports that offer in-depth analysis
            based on individual growth patterns. Tailored to your child{"'"}s
            specific data, these reports provide actionable insights, helping
            you track progress over time and make better-informed healthcare
            decisions.
          </p>
          <a className={styles.ctaButton} onClick={() => openModal("signup")}>
            Create account
          </a>
        </div>
      </div>

      <div className={styles.backgroundSection2}>
        <div className={styles.how}>
          <h1
            className={
              "text-[32px] sm:text-4xl text-center sm:text-start font-medium"
            }
            style={{
              fontFamily: "Ledger",
            }}
          >
            How it works
          </h1>
        </div>
        <div className={styles.contentContainer2}>
          <div className={styles.contentItem}>
            <div className={styles.imgAndHeading}>
              <h3
                style={{ color: "black" }}
                onClick={() => openModal("signup")}
              >
                1. Create Account
              </h3>
            </div>
            <p style={{ color: "black" }}>
              Start by creating a secure account with us. This step is simple
              and quick, allowing you to access personalized child growth
              diagnostics. Once registered, you can easily manage multiple
              child/patient profiles from a single account, ensuring that all
              your child{"'"}s/patient{"'"}s growth data is safely stored and
              readily accessible.
            </p>
          </div>
          <div className={styles.contentItem}>
            <div className={styles.imgAndHeading}>
              <h3 style={{ color: "black" }}>2. Diagnose</h3>
            </div>
            <p style={{ color: "black" }}>
              After setting up your account, enter your child{"'"}s/patient{"'"}
              s anthropomorphic measurements, such as height, weight, and head
              circumference. Our advanced algorithms will analyze these inputs,
              delivering an accurate assessment of your child{"'"}s growth and
              nutritional status in seconds.
            </p>
          </div>
          <div className={styles.contentItem}>
            <div className={styles.imgAndHeading}>
              <h3 style={{ color: "black" }}>3. Get Report</h3>
            </div>
            <p style={{ color: "black" }}>
              Our system then generates a comprehensive report detailing your
              child{"'"}s growth metrics, including potential areas of concern,
              helping you make informed decisions about your child{"'"}s health
              and development. Access it anytime, download, or share it with
              healthcare professionals directly from your dashboard.
            </p>
          </div>
        </div>
        <div className={styles.ctaButtondiv}>
          <a
            id="cta-btn-2"
            className={styles.ctaButton}
            onClick={() => openModal("signup")}
          >
            Create account
          </a>
        </div>
      </div>

      {isModalOpen && (
        <RoleSelectionModal
          onClose={() => setIsModalOpen(false)}
          onSelectRole={handleRoleSelection}
        />
      )}
      <footer className={styles.uniqueFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerBranding}>
            <h4 className={styles.footerBrand}>
              <img src="/Logo1.png" alt="Logo" /> NouraSense
            </h4>
            <p className={styles.footerParagraph}>
              Developing state-of-the-art diagnostics and reporting tools for
              better child care.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/support">Support</Link>
              </li>
              <li>
                <Link to="/support">Feedback</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/t&c">Terms and Conditions</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Account</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="signup">Create account</Link>
              </li>
              <li>
                <Link to="login">Sign in</Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Connect With Us</h4>
            <div className={styles.socialIcons}>
              <a
                className={styles.socialIcon}
                onClick={() => window.open(linkedIn, "_blank")}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                className={styles.socialIcon}
                onClick={() => window.open(instaLink, "_blank")}
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                className={styles.socialIcon}
                onClick={() =>
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`,
                    "_blank",
                  )
                }
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
              <a
                className={styles.socialIcon}
                onClick={() => window.open(`tel:${phoneNumber}`, "_blank")}
                aria-label="Phone"
              >
                <FaPhone size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.landing_copyright}>
            © Copyright NouraSense 2024. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
