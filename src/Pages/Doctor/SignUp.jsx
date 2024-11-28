import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import GoogleLogo from "src/assets/Doctor/google-icon-logo-svgrepo-com.svg";
import copyrightIcon from "src/assets/Doctor/copyright.png";
import { useSignup, useVerifyOtp } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate: signup } = useSignup();
  const { mutate: verifyOtp } = useVerifyOtp();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [isLoadingVerifyOtp, setIsLoadingVerifyOtp] = useState(false);

  useEffect(() => {
    document.title = "Nourasense - Sign up";
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle signup submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoadingSignUp(true);
    try {
      const data = {
        email: formData.email,
        password: formData.password,
        userType: "doctor", // Default user type to 'doctor'
      };
      await signup(data, {
        onMutate: () => {
          const toastId = toast.loading("Please wait...");
          return { toastId };
        },
        onSuccess: (response, variables, context) => {
          setIsOtpSent(true);
          toast.success("Otp sent successfully", { id: context.toastId });
        },
        onError: (error, variables, context) => {
          toast.error(error.response.data.message || "Something went wrong");
        },
      });
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoadingSignUp(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoadingVerifyOtp(true);
    try {
      const otpData = {
        email: formData.email,
        otp: otpInput,
      };
      await verifyOtp(otpData, {
        onMutate: () => {
          const toastId = toast.loading("Please wait...");
          return { toastId };
        },
        onSuccess: (response, variables, context) => {
          toast.success("Otp Verified successfully");
          localStorage.setItem("DoctorToken", response.data.data.token);
          navigate("/doctor/updateProfileDoc");
        },
      });
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoadingVerifyOtp(false);
    }
  };

  return (
    <div className={styles.pageContainer1}>
      <div className={styles.signupDocContainer1}>
        <h2>Create an Account</h2>
        <div className={styles.resume}>
          <p className={styles.resumeP}>
            Join Nourasense to optimise child growth with ease.
          </p>
        </div>
        <form id="signup-form" onSubmit={handleSignUp}>
          <div className={styles.emailContainer}>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.textInput}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isOtpSent}
              required
            />
          </div>
          <div className={styles.passwordContainer}>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.textInput}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isOtpSent}
              required
            />
          </div>
          {!isOtpSent && (
            <button
              type="submit"
              className={styles.SignUpButton}
              disabled={isLoadingSignUp}
            >
              {isLoadingSignUp ? "Signing Up..." : "Sign Up"}
            </button>
          )}
          {isOtpSent && (
            <>
              <div className={styles.otpContainer}>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className={styles.textInput}
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className={styles.SignUpButton}
                onClick={handleVerifyOtp}
                disabled={isLoadingVerifyOtp}
              >
                {isLoadingVerifyOtp ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </>
          )}
          <div className={styles.orDivider}>
            <span>OR</span>
          </div>

          <button type="button" className={styles.googleBtn}>
            <img
              src={GoogleLogo}
              alt="Google Logo"
              className={styles.googleLogo}
            />
            Sign up with Google
          </button>
          <p className={styles.privacySignUp}>
            By Signing Up, you agree to our{" "}
            <a href="#">Terms, Conditions and Privacy Policy </a>
          </p>
          <p className={styles.alreadyAccount}>
            Already have an account? <Link to="/doctor/login">Sign in</Link>
          </p>
        </form>
      </div>
      <footer className={styles.docFooter}>
        <p className={styles.copyright}>
          <img
            src={copyrightIcon}
            alt="Copyright Icon"
            className="copyright-icon"
          />{" "}
          Copyright Nourasense 2024. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default SignUp;
