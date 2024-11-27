import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "src/Hooks/AdminHooks.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (localStorage.getItem("AdminToken")) {
      navigate("/admin/");
    }
  }, []);

  useEffect(() => {
    document.title = "Nourasense - Log in";
  }, []);

  const onSubmit = (data) => {
    const id = toast.loading("Please wait!");
    mutation.mutate(data, {
      onSuccess: (response) => {
        if (response.data && response.data.statusCode === 200) {
          toast.success("Welcome Back!", { id });
        }
        localStorage.setItem("AdminToken", response.data.data.token);
        navigate("/admin/");
      },
      onError: (error) => {
        if (error && error.status === 401) {
          return toast.error("Invalid credentials!", { id });
        }
        toast.error("Something went wrong", { id });
        // Handle error (e.g., show error message)
      },
    });
  };

  return (
    <div className={"w-full h-full  flex justify-center items-center px-4"}>
      <div className={" max-w-[500px] mt-[76px] p-2.5 bg-[#fff] rounded-[8px]"}>
        <h2
          className={
            "text-black font-Inter text-center font-bold mb-[18px] text-[24px] md:text-[28px]"
          }
        >
          Welcome Back!
        </h2>
        <p
          className={
            "font-Inter font-light text-center text-wrap tracking-normal text-[18px] md:text-[20px]"
          }
        >
          Resume where you left of and get up-to-date diagnostics and reports
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col gap-y-8 md:gap-y-10"
        >
          {/* Email Input */}
          <div>
            <input
              type="email"
              className={`w-full h-14 font-Inter px-4 border rounded-[16px] focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 pl-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              className={`w-full h-14 font-Inter px-4 border rounded-[16px] focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 pl-1 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-1">
            <input
              name="remember"
              className="w-4 h-4 cursor-pointer"
              type="checkbox"
            />
            <label htmlFor="remember" className="font-Inter text-sm">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="font-Inter bg-[#002F88] text-lg font-semibold text-white px-3 py-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
