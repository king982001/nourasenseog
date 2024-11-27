import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import GoogleLogo from "src/assets/Doctor/google-icon-logo-svgrepo-com.svg";
import copyrightIcon from "src/assets/Doctor/copyright.png";
import { useContext, useEffect, useState } from "react";
import { useLogin } from "src/Hooks/DoctorHooks.js";
import { DataContext } from "src/Context/Doctor/DataProvider.jsx";
import toast from "react-hot-toast";

const signInInitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(signInInitialValues);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  useEffect(() => {
    if (localStorage.getItem("DoctorToken")) {
      navigate("/doctor/dashboard");
    }
  }, []);

  useEffect(() => {
    document.title = "Nourasense - Sign in";
  }, []);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    setLoading(true);
    await login(data, {
      onSuccess: (response) => {
        toast.success("Welcome Back!", { id: toastId });
        navigate("/doctor/dashboard");
        localStorage.setItem("DoctorToken", response.data.data.token);
        localStorage.setItem(
          "DoctorAccount",
          JSON.stringify(response.data.data.doctor),
        );
        setAccount(response.data.data.doctor);
      },
      onError: (error) => {
        if (error.status === 401 || error.status === 404) {
          toast.error("Invalid Credentials", { id: toastId });
        } else {
          toast.error("An error occurred. Please try again.", {
            id: toastId,
          });
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
              name="email"
              className={styles.inputField}
              placeholder="Email"
              onChange={changeHandler}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
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
                <Link to="/doctor/forgot-password" className={styles.forgotPs}>
                  Forgot Password?
                </Link>
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
        <p className={styles.signupLink}>
          Don{"'"}t have an account?{" "}
          <Link to="/doctor/signup" className={styles.signupLinkBlue}>
            Sign Up
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

export default Login;
