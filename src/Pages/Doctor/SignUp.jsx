import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GoogleLogo from "src/assets/Doctor/google-icon-logo-svgrepo-com.svg";
import { useSignup, useVerifyOtp } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import { motion } from "motion/react";

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
    document.title = "Nourasense - Doctor Sign Up";
    
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

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle signup submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoadingSignUp(true);
    const toastId = toast.loading("Please wait...");

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
      onSuccess: () => {
        setIsOtpSent(true);
        toast.success("OTP sent successfully", { id: toastId });
      },
      onError: (error) => {
        toast.error(
          error.status === 409
            ? "Email already exists!"
            : "Something went wrong!",
          { id: toastId },
        );
        setIsLoadingSignUp(false);
      },
    });
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    setIsLoadingVerifyOtp(true);
    try {
      const otpData = {
        email: formData.email,
        otp: otpInput,
      };
      await verifyOtp(otpData, {
        onSuccess: (response, variables, context) => {
          toast.success("OTP verified successfully", { id: toastId });
          localStorage.setItem("DoctorToken", response.data.data.token);
          navigate("/doctor/update-profile", {
            state: {
              fromSignup: true,
              email: formData.email,
              password: formData.password,
            },
          });
        },
        onError: (error) => {
          toast.error("Unable to verify OTP", { id: toastId });
          setIsLoadingVerifyOtp(false);
        },
      });
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoadingVerifyOtp(false);
    }
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
            Doctor Registration
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Join Nourasense to optimize child growth monitoring and become part of our healthcare community
          </p>

          {/* Sign up Form */}
          {!isOtpSent ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-light text-gray-600 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-light text-gray-600 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoadingSignUp}
              >
                {isLoadingSignUp ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-light text-gray-600 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  We've sent a verification code to {formData.email}
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-secondary-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoadingVerifyOtp}
              >
                {isLoadingVerifyOtp ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : "Verify & Continue"}
              </button>
            </form>
          )}

          <div className="relative flex justify-center items-center my-6">
            <span className="absolute bg-white px-4 text-xs text-gray-500">OR</span>
            <div className="w-full h-px bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70"
            disabled={true}
          >
            <img src={GoogleLogo} alt="Google Logo" className="h-4 w-4 mr-2" />
            Sign up with Google
          </button>
          
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/doctor/login"
              className="text-primary-blue font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>

        <div className="mt-8 text-xs text-gray-500">
          <p className="text-center">
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
    </div>
  );
};

export default SignUp;
