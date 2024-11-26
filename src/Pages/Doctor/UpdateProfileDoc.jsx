import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateProfileDoc.module.css";
import copyrightIcon from "/src/assets/Doctor/copyright.png";
import { useUpdateGeneralDetails } from "../../Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const UpdateProfileDoc = () => {
  const navigate = useNavigate();
  const { mutate: updateGeneralDetails } = useUpdateGeneralDetails();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
    address: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  // Validation patterns
  const namePattern = /^[A-Za-z]*$/; // Only letters
  const numericPattern = /^[0-9]*$/; // Only numbers
  const validateAddress = (address) => address.length > 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" || name === "surname") {
      if (namePattern.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (["dobDay", "dobMonth", "dobYear"].includes(name)) {
      if (numericPattern.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (numericPattern.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    // Final Validation checks
    if (!validateAddress(formData.address)) {
      return setError("Address must be at least 6 characters long.");
    }

    try {
      const data = { ...formData, phonenumber: phoneNumber };
      await updateGeneralDetails(data, {
        onSuccess: (response) => {
          console.log(response);
          toast.success("Details Updated!");
          localStorage.setItem(
            "DoctorAccount",
            JSON.stringify(response?.data.data.doctor),
          );
          navigate("/doctor/updateProfileDoc2");
        },
        onError: (error) => {
          toast.error("Error updating details!");
        },
      });
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className={styles.pageContainer1}>
      <header className={styles.header}></header>
      <div className={styles.signupDocContainer1}>
        <h2>Update Profile</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form id="signup-form" onSubmit={handleNext}>
          <div className={styles.nameContainer1}>
            <label>Legal Name</label>
            <div className={styles.nameInputs}>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.textInput}
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                id="surname"
                name="surname"
                className={styles.textInput}
                placeholder="Surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles.dobContainer}>
            <label>Date of Birth</label>
            <div className={styles.dobInputs}>
              <input
                type="text"
                id="dob-day"
                name="dobDay"
                className={styles.textInput}
                placeholder="Day"
                value={formData.dobDay}
                onChange={handleInputChange}
                required
                maxLength="2"
              />
              <input
                type="text"
                id="dob-month"
                name="dobMonth"
                className={styles.textInput}
                placeholder="Month"
                value={formData.dobMonth}
                onChange={handleInputChange}
                required
                maxLength="2"
              />
              <input
                type="text"
                id="dob-year"
                name="dobYear"
                className={styles.textInput}
                placeholder="Year"
                value={formData.dobYear}
                onChange={handleInputChange}
                required
                maxLength="4"
              />
            </div>
          </div>

          <div className={styles.genderContainer}>
            <label>Gender</label>
            <div className={styles.genderInputs}>
              <label className={styles.genderLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInputChange}
                  required
                />{" "}
                Male
              </label>
              <label className={styles.genderLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInputChange}
                  required
                />{" "}
                Female
              </label>
              <label className={styles.genderLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={handleInputChange}
                  required
                />{" "}
                Other
              </label>
            </div>
          </div>

          <div className={styles.phoneContainer}>
            <input
              type="tel"
              onChange={handlePhoneChange}
              value={phoneNumber}
              maxLength="10"
              id="phone"
              name="phone"
              className={styles.textInput}
              placeholder="Phone Number"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              id="address"
              name="address"
              className={styles.textInput}
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className={styles.nextButton}>
            Next
          </button>
        </form>
      </div>
      <footer className={styles.docFooter}>
        <p className={styles.copyright}>
          <img
            src={copyrightIcon}
            alt="Copyright Icon"
            className="copyright-icon"
          />
          Copyright Nourasense 2024 . All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default UpdateProfileDoc;
