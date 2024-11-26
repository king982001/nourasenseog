import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import copyrightIcon from "/src/assets/Doctor/copyright.png";
import {
  useResetPassword,
  useResetPasswordSendOtp,
  useResetPasswordVerifyOtp,
} from "../../Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Steps: 1 = Request OTP, 2 = Verify OTP, 3 = Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutate: resetPasswordSendOTP } = useResetPasswordSendOtp();
  const { mutate: resetPasswordVerifyOTP } = useResetPasswordVerifyOtp();
  const { mutate: resetPassword } = useResetPassword();

  useEffect(() => {
    document.title = "Nourasense - Forgot password";
  }, []);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      resetPasswordSendOTP(email, {
        onSuccess: () => {
          toast.success("OTP has been sent to your email");
          setStep(2);
        },
        onError: () => {
          toast.error("Error sending OTP");
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Simulate OTP verification
      await resetPasswordVerifyOTP(
        { email, otp },
        {
          onSuccess: (response) => {
            if (response.status === 200) {
              toast.success("OTP verified successfully.");
              setStep(3);
            } else {
              toast.error("Invalid OTP!");
            }
          },
          onError: () => {
            toast.error("Failed to verify OTP. Please try again.");
          },
        },
      );
    } catch {
      console.log("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      // Simulate password reset
      await resetPassword(
        { email, password, confirmPassword },
        {
          onSuccess: (response) => {
            toast.success("Password reset successful");
            setStep(1);
          },
          onError: () => {
            toast.error("Failed to reset Password. Please try again.");
          },
        },
      );
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.headerSignIn}></div>
      <div className={styles.signinContainer}>
        <h2>
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>
        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <p className={styles.resumeP}>
              Enter your email address and we’ll send you a OTP to reset your
              password.
            </p>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                className={styles.inputField}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button type="submit" className={styles.signinBtn}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <p className={styles.resumeP}>
              Enter the OTP sent to your email to verify your identity.
            </p>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="otp"
                className={styles.inputField}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button type="submit" className={styles.signinBtn}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <p className={styles.resumeP}>
              Enter your new password to reset your account.
            </p>
            <div className={styles.formGroup}>
              <input
                type="password"
                name="password"
                className={styles.inputField}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                name="confirmPassword"
                className={styles.inputField}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button type="submit" className={styles.signinBtn}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
      <footer className={styles.footerSignIn}>
        <p className={styles.signupLink}>
          Back to{" "}
          <Link to="/doctor/login" className={styles.signupLinkBlue}>
            Sign In
          </Link>
        </p>
        <p className={styles.copyright}>
          <img
            src={copyrightIcon}
            alt="Copyright Icon"
            className={styles.copyrightIcon}
          />
          Copyright Nourasense 2024 . All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
