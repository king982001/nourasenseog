import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import GoogleLogo from "src/assets/Patient/google-icon-logo-svgrepo-com.svg";
import copyrightIcon from "src/assets/Patient/copyright.png";
import React, { useEffect, useState } from "react";
import { useLogin } from "src/Hooks/PatientHooks.js";
import toast from "react-hot-toast";

const signInInitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(signInInitialValues);
  const [error, setError] = useState("");
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
        console.log(response.data.data);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem(
          "account",
          JSON.stringify(response.data.data.parent),
        );
        navigate("/dashboard");
      },
      onError: (error) => {
        if (error.status >= 400) {
          toast.error("Invalid Credentials", { id: toastId });
        } else {
          toast.error("Something went wrong", { id: toastId });
        }
      },
    });
  };

  return (
    <div>
      <div className={styles.signinContainer}>
        <h2>Welcome Back!</h2>
        <div className={styles.resume}>
          <p className={styles.resumeP}>
            Resume where you left off and get up-to-date diagnostics and reports
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email" // Added name attribute
              className={styles.inputField}
              placeholder="Email"
              onChange={changeHandler}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              name="password" // Added name attribute
              className={styles.inputField}
              placeholder="Password"
              onChange={changeHandler}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.remMe}>
            <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                id="terms"
              />
              <label className={styles.termsText} htmlFor="terms">
                Remember Me
              </label>
            </div>
            <div>
              <p className={styles.forgotPs}>
                <a href="#" className={styles.forgotPs}>
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>

          <button type="submit" className={styles.signinBtn}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className={styles.orDivider}>
            <span>OR</span>
          </div>

          <button type="button" className={styles.googleBtn}>
            <img
              src={GoogleLogo}
              alt="Google Logo"
              className={styles.googleLogo}
            />
            Sign in with Google
          </button>
        </form>
      </div>
      <footer className={styles.footerSignIn}>
        <div>
          <span className={"text-[16px]"}>Are you a doctor? </span>
          <Link
            to={"/doctor/login"}
            className={"text-primary-blue font-semibold text-[16px]"}
          >
            login
          </Link>
        </div>
        <p className={styles.signupLink}>
          Don{"'"}t have an account?{" "}
          <Link to="/signup" className={styles.signupLinkBlue}>
            Sign Up
          </Link>
        </p>
        <p className={styles.copyright}>
          <img
            src={copyrightIcon}
            alt="Copyright Icon"
            className={styles.copyrightIcon}
          />
          Copyright Curasense 2024 . All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
