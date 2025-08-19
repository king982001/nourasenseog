import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignup, useVerifyOtp } from "src/Hooks/PatientHooks.js";
import toast from "react-hot-toast";
import GoogleLogo from "src/assets/Patient/google-icon-logo-svgrepo-com.svg";
import { motion } from "motion/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate: signup } = useSignup();
  const { mutate: verifyOtp } = useVerifyOtp();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Nourasense - Signup";
    
    // Add Inter font
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');
      body {
        font-family: 'Inter', sans-serif;
        font-weight: 300;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar */}
      <div className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-100">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo-blue.png" alt="Nourasense" className="h-5 w-auto sm:h-6 sm:w-auto md:h-7 md:w-auto lg:h-6 lg:w-auto" />
        </Link>
        <Link 
          to="/" 
          className="text-sm text-gray-600 hover:text-primary-blue flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-light text-neutral-800 text-center mb-2">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Join us and start your journey
          </p>
          
          {!isOtpStage ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-light text-gray-600 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-light text-gray-600 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors 
                disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up...
                  </span>
                ) : "Sign Up"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-light text-gray-600 mb-1">Enter OTP</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">
                  We've sent a verification code to your email
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors 
                disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : "Verify OTP"}
              </button>
            </form>
          )}

          <div className="relative flex justify-center items-center my-6">
            <span className="absolute bg-white px-4 text-xs text-gray-500">OR</span>
            <div className="w-full h-px bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors 
            disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70"
            disabled={true}
          >
            <img src={GoogleLogo} alt="Google Logo" className="h-4 w-4 mr-2" />
            Sign up with Google
          </button>
          
          <p className="mt-6 text-xs text-gray-600 text-center">
            By signing up, you agree to our{" "}
            <Link to="/t&c" className="text-primary-blue hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="text-primary-blue hover:underline">
              Privacy Policy
            </Link>
          </p>
          
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-blue font-medium hover:underline">
              Log In
            </Link>
          </p>
        </motion.div>

        <div className="mt-8 text-xs text-gray-500">
          <p className="text-center">
            &copy; 2024 Nourasense. All rights reserved.{" "}
            <Link to="/privacy-policy" className="text-primary-blue hover:underline">
              Privacy Policy
            </Link>
            {" | "}
            <Link to="/t&c" className="text-primary-blue hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
