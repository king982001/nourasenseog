import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GoogleLogo from "src/assets/Doctor/google-icon-logo-svgrepo-com.svg";
import { useSignup, useVerifyOtp } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import BackButton from "src/Components/BackButton.jsx";

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
        toast.success("Otp sent successfully", { id: toastId });
      },
      onError: (error) => {
        toast.error(
          error.status === 409
            ? "Email already exist!"
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
    <>
      <div className="h-[80vh] sm:h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg drop-shadow-lg">
          <h2 className="text-xl md:text-3xl text-neutral-700 text-center mb-4 font-serif">
            Doctor - Create Your Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Join Nourasense to optimize child growth with ease and become a part
            of our healthcare community.
          </p>

          {/* Sign up Form */}
          {!isOtpSent ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  id={"email"}
                  name={"email"}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue-dark"
                disabled={isLoadingSignUp}
              >
                {isLoadingSignUp ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue-dark"
                disabled={isLoadingVerifyOtp}
              >
                {isLoadingVerifyOtp ? "Verifying OTP..." : "Verify OTP"}
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
          <div className={"flex items-center justify-center mt-6"}>
            <p className={"text-sm text-gray-600"}>
              Already have an account?{" "}
              <Link
                to="/doctor/login"
                className="text-primary-blue hover:underline"
              >
                Sign In
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
