import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "src/Hooks/PatientHooks.js";
import toast from "react-hot-toast";
import GoogleLogo from "src/assets/Patient/google-icon-logo-svgrepo-com.svg";

const signInInitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(signInInitialValues);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Please wait");
    login(data, {
      onSuccess: (response) => {
        toast.success("Welcome back!", { id: toastId });
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem(
          "account",
          JSON.stringify(response.data.data.parent),
        );
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(
          error.status >= 400 ? "Invalid Credentials" : "Something went wrong",
          { id: toastId },
        );
        setLoading(false);
      },
    });
  };

  return (
    <div className="h-[100vh] md:h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg drop-shadow-lg">
        <h2 className="text-2xl md:text-3xl text-neutral-700 font-bold text-center mb-4">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Resume where you left off and get up-to-date diagnostics and reports.
        </p>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-primary-blue-dark"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="relative flex justify-center items-center mt-6">
          <span className="absolute bg-white px-4 text-gray-500">OR</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center mt-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={true}
        >
          <img src={GoogleLogo} alt="Google Logo" className="h-5 w-5 mr-2" />
          Sign in with Google
        </button>
        <div className={"flex justify-between mt-4"}>
          <p className="text-sm text-center text-gray-600">
            <Link
              to="/signup"
              className="text-primary-blue font-medium hover:underline"
            >
              Create Account
            </Link>
          </p>
          <p className="text-sm text-center text-gray-600">
            <Link
              to="/forgot-password"
              className="text-primary-blue font-medium hover:underline"
            >
              Forgot Password?
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
  );
};

export default Login;
