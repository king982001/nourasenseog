import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "src/Hooks/AdminHooks.js";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const mutation = useLogin();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("AdminToken")) {
      navigate("/admin/");
    }
  }, []);

  useEffect(() => {
    document.title = "Nourasense - Admin Login";
    
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

  const onSubmit = (data) => {
    const id = toast.loading("Please wait...");
    setLoading(true);
    mutation.mutate(data, {
      onSuccess: (response) => {
        if (response.data && response.data.statusCode === 200) {
          toast.success("Welcome Back!", { id });
        }
        localStorage.setItem("AdminToken", response.data.data.token);
        navigate("/admin/");
      },
      onError: (error) => {
        setLoading(false);
        if (error && error.status === 401) {
          return toast.error("Invalid credentials!", { id });
        }
        toast.error("Something went wrong", { id });
      },
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar */}
      <div className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-100">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/Logo1.png" alt="Nourasense" className="h-8 w-auto" />
          <span className="text-primary-blue font-medium text-lg">Nourasense</span>
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
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Sign in to access your admin dashboard
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-light text-gray-600 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 mt-1 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-light text-gray-600 mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 mt-1 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 border-gray-300 rounded text-primary-blue focus:ring-primary-blue"
                name="remember"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-800 transition-colors 
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-xs text-center text-gray-600">
            <p>
              This login is exclusively for authorized administrators.
            </p>
          </div>
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
