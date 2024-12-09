import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignup, useVerifyOtp } from "src/Hooks/PatientHooks.js";
import toast from "react-hot-toast";
import GoogleLogo from "src/assets/Patient/google-icon-logo-svgrepo-com.svg";
import BackButton from "src/Components/BackButton.jsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate: signup } = useSignup();
  const { mutate: verifyOtp } = useVerifyOtp();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Please wait...");
    signup(
      { email, password },
      {
        onSuccess: () => {
          toast.success("OTP sent to your email", { id: toastId });
          setIsOtpStage(true);
          setLoading(false);
        },
        onError: (error) => {
          toast.error(
            error.status === 409
              ? "Email already exist!"
              : "Something went wrong!",
            { id: toastId },
          );
          setLoading(false);
        },
      },
    );
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Please wait...");
    verifyOtp(
      { email, otp },
      {
        onSuccess: (response) => {
          toast.success("OTP verified!", { id: toastId });
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem(
            "account",
            JSON.stringify(response.data.data.parent),
          );
          navigate("/update-profile", { state: { fromSignUp: true } });
        },
        onError: () => {
          toast.error("Failed to verify OTP!", { id: toastId });
          setLoading(false);
        },
      },
    );
  };

  return (
    <>
      <div className="h-[80vh] md:h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg drop-shadow-lg">
          <h2 className="text-2xl md:text-3xl text-neutral-700 font-bold text-center mb-4 font-serif">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Join us and start your journey.
          </p>
          {!isOtpStage ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue-dark"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue-dark"
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </form>
          )}

          <div className="relative flex justify-center items-center mt-6">
            <span className="absolute bg-white px-4 text-gray-500">OR</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center mt-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={true}
          >
            <img src={GoogleLogo} alt="Google Logo" className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            By signing up, you agree to our{" "}
            <Link to="/t&c" className="text-primary-blue hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="text-primary-blue hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className={"flex items-center justify-center mt-6"}>
            <p className={"text-sm text-gray-600"}>
              {" "}
              Already have an account?{" "}
              <Link to="/login" className="text-primary-blue hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-500">
          <p className="text-center md:text-left">
            &copy; 2024 Nourasense. All rights reserved.{" "}
            <Link
              to="/privacy-policy"
              className="text-primary-blue hover:underline"
            >
              Privacy Policy
            </Link>
            {" | "}
            <Link to="/t&c" className="text-primary-blue hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
