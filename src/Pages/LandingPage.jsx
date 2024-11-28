import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/Logo.png";
import styles from "./Doctor/LandingPage.module.css";

import heroImage1 from "/src/assets/Doctor/1.png";
import heroImage2 from "/src/assets/Doctor/2.png";
import heroImage3 from "/src/assets/Doctor/3.png";
import backgroundSvg from "/src/assets/Doctor/svg.svg";
import miniImage1 from "/src/assets/Doctor/mini 1.svg";
import miniImage2 from "/src/assets/Doctor/mini 2.svg";
import miniImage3 from "/src/assets/Doctor/mini 3.svg";
import linkedinIcon from "/src/assets/Doctor/linkedin.svg";
import instagramIcon from "/src/assets/Doctor/instagram.svg";
import mailIcon from "/src/assets/Doctor/mail.svg";
import callIcon from "/src/assets/Doctor/call.svg";
import copyrightIcon from "/src/assets/Doctor/copyright 1.png";

const phoneNumber = "+91 9723964754";
const emailAddress = "support@nourasense.com";
const instaLink = "https://www.Instagram.com/nourasense_co";
const linkedIn = "https://www.linkedin.com/company/nourasense";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for controlling the menu

  useEffect(() => {
    document.title = "Nourasense - Doctor";
  }, []);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>
          <Link to={"/"}>
            <img src={Logo} alt="Nourasense" className={"h-8 w-auto"} />
          </Link>
        </div>
        <div
          className={`${styles.navbarLinks} ${isMenuOpen ? styles.active : ""}`}
          id="navbar-links"
        >
          <ul>
            <li
              className={styles.liInLanding}
              onClick={() => navigate("/support")}
            >
              <a>Support</a>
            </li>
            <li
              className={styles.liInLanding}
              onClick={() => navigate("/support")}
            >
              <a>Feedback</a>
            </li>
            <li
              className={styles.signinInLanding}
              onClick={() => navigate("/login")}
            >
              <a>Sign in</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.heroSection} style={{ marginRight: "-5%" }}>
        <div className={styles.heroContent}>
          <h1>
            Join Nourasense & Transform Child <b>Growth Monitoring</b>
          </h1>
          <p>
            Be a part of the revolution in child healthcare with{" "}
            <b>Nourasense</b>. Our innovative platform empowers you to track,
            diagnose, and optimize child growth with precision and ease. Join us
            in shaping a healthier future for children, where advanced
            diagnostics and personalized care are at your fingertips.
          </p>
          <a
            className={styles.ctaButton}
            onClick={() => navigate("/doctor/signup")}
          >
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

      <div className={styles.heroSection} style={{ marginLeft: "-5%" }}>
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
          <a
            className={styles.ctaButton}
            onClick={() => navigate("/doctor/signup")}
          >
            Create account
          </a>
        </div>
      </div>

      <div
        className={styles.heroSection}
        style={{ marginBottom: "-70px", marginLeft: "-5%" }}
      >
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
          <a
            className={styles.ctaButton}
            onClick={() => navigate("/doctor/signup")}
          >
            Create account
          </a>
        </div>
      </div>

      <div className={styles.backgroundSection2}>
        <h2 className={styles.sectionHeading}>What are we Solving?</h2>
        <div className={styles.how}>
          <h1
            style={{
              padding: "2rem 4rem",
              fontFamily: "Ledger",
              fontWeight: "100",
              margin: "-50px 0",
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
                onClick={() => navigate("/doctor/signup")}
              >
                1. Create Account
              </h3>
              <div className={styles.secImg}>
                <img src={miniImage1} alt="" />
              </div>
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
              <div className={styles.secImg}>
                <img src={miniImage2} alt="" />
              </div>
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
              <div className={styles.secImg}>
                <img src={miniImage3} alt="" />
              </div>
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
            onClick={() => navigate("/doctor/signup")}
          >
            Create account
          </a>
        </div>
      </div>

      <footer className={styles.uniqueFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Links</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a onClick={() => navigate("/support")}>Support </a>
              </li>
              <li>
                <a onClick={() => navigate("/support")}>Feedback </a>
              </li>
              <li>
                <a onClick={() => navigate("/doctor/signup")}>Create account</a>
              </li>
              <li>
                <a onClick={() => navigate("/login")}>Sign in </a>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Nourasense</h4>
            <p className={styles.footerParagraph}>
              Developing state-of-the-art diagnostics and reporting tools for
              better child care.
            </p>
            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Find Us on</h4>
              <div className={styles.socialIcons}>
                <a className={styles.socialIcon}>
                  <img
                    src={linkedinIcon}
                    style={{ width: "31px" }}
                    alt=""
                    onClick={() => window.open(`${linkedIn}`, "_blank")}
                  />
                </a>
                <a className={styles.socialIcon}>
                  <img
                    src={instagramIcon}
                    style={{ width: "25px" }}
                    alt=""
                    onClick={() => window.open(`${instaLink}`, "_blank")}
                  />
                </a>
                <a className={styles.socialIcon}>
                  <img
                    src={mailIcon}
                    style={{ width: "25px" }}
                    alt=""
                    onClick={() =>
                      window.open(
                        `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`,
                        "_blank",
                      )
                    }
                  />
                </a>
                <a className={styles.socialIcon}>
                  <img
                    src={callIcon}
                    style={{ width: "25px" }}
                    alt=""
                    onClick={() => window.open(`tel:${phoneNumber}`, "_blank")}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.landing_copyright}>
            <img
              src={copyrightIcon}
              alt="Copyright Icon"
              className="copyicon"
            />
            Copyright Nourasense 2024 . All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
