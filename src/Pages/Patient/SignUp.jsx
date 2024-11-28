import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import copyrightIcon from "src/assets/Patient/copyright.png";
import { useSignup, useVerifyOtp } from "src/Hooks/PatientHooks.js";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: signup } = useSignup();
  const { mutate: verifyOtp } = useVerifyOtp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    signup(
      { email, password },
      {
        onSuccess: () => {
          toast.success("OTP sent to your email", { id: toastId });
          setIsModalOpen(true);
        },
        onError: () => {
          toast.error("Something went wrong!", { id: toastId });
        },
      },
    );
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    verifyOtp(
      { email, otp },
      {
        onSuccess: (response) => {
          toast.success("OTP verified!", { id: toastId });
          console.log(response);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem(
            "account",
            JSON.stringify(response.data.data.parent),
          );
          navigate("/dashboard");
        },
        onError: () => {
          toast.error("Failed to verify otp!", { id: toastId });
        },
      },
    );
  };

  return (
    <>
      <div className={styles.signupContainer}>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.signupBtn}>
            Sign Up
          </button>
        </form>
      </div>

      {/* OTP Modal */}
      {isModalOpen && (
        <>
          <div className={styles.otpContainer}>
            <input
              type="text"
              id="otp"
              name="otp"
              className={styles.textInput}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className={styles.SignUpButton}
            onClick={handleVerifyOtp}
            disabled={isLoading}
          >
            {isLoading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </>
      )}

      <footer className={styles.footer}>
        <p className={styles.privacy}>
          By Signing Up, you agree to our{" "}
          <a href="#">Terms, Conditions, and Privacy Policy</a>
        </p>
        <p className={styles.signinLink}>
          Already have an account?{" "}
          <Link to="/signin" className={styles.signupLinkBlue}>
            Sign In
          </Link>
        </p>
        <p className={styles.copyright}>
          <img
            src={copyrightIcon}
            alt="Copyright"
            className={styles.copyrightIcon}
          />{" "}
          Copyright Curasense 2024. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default SignUp;
