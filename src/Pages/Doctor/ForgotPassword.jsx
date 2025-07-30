import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import copyrightIcon from "src/assets/Doctor/copyright.png";
import {
  useResetPassword,
  useResetPasswordSendOtp,
  useResetPasswordVerifyOtp,
} from "src/Hooks/DoctorHooks.js";
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
  const navigate = useNavigate();

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
            navigate("/doctor/login");
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
    <div className="h-[85vh] md:h-screen px-4 sm:px-0 flex items-center justify-center py-12 ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl text-center text-gray-800 mb-4 sm:mb-6 font-serif">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Enter your email address, and we’ll send you an OTP to reset your
              password.
            </p>
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-blue text-white font-semibold rounded-lg hover:bg-primary-blue-dark focus:outline-none"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-gray-600 text-center">
              Enter the OTP sent to your email to verify your identity.
            </p>
            <div className="flex flex-col">
              <input
                type="text"
                name="otp"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-blue text-white font-semibold rounded-lg hover:bg-primary-blue-dark focus:outline-none"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-gray-600 text-center">
              Enter your new password to reset your account.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-blue text-white font-semibold rounded-lg hover:bg-primary-blue-dark focus:outline-none"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
