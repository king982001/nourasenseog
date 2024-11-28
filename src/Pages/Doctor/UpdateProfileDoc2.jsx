import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateProfileDoc2.module.css";
import copyrightIcon from "src/assets/Doctor/copyright.png";
import { useUpdateMedicalVerification } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const UpdateProfileDoc2 = () => {
  const [regnoValue, setRegnoValue] = useState("");
  const [establishmentName, setEstablishmentName] = useState("");
  const [placeOfEstablishment, setPlaceOfEstablishment] = useState("");
  const [regCouncil, setRegCouncil] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { mutate: updateMedicalDetails } = useUpdateMedicalVerification();

  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();

    // Gather the form data
    const verificationData = {
      establishment_name: establishmentName,
      place_of_establishment: placeOfEstablishment,
      registration_number: regnoValue,
      registration_council: regCouncil,
    };

    try {
      setLoading(true);
      setErrorMessage(""); // Clear any previous error message
      // Call the API to update medical verification
      await updateMedicalDetails(verificationData, {
        onSuccess: () => {
          navigate("/doctor/UpdateProfileDoc3");
        },
        onError: () => {
          toast.error("Error updating details");
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        "Failed to update verification details. Please try again.",
      );
    }
  };

  const handleregnoChange = (e) => {
    const newValue = e.target.value;
    // Ensure numeric only input for regnoValue
    if (/^[0-9]*$/.test(newValue)) {
      setRegnoValue(newValue);
    }
  };

  const handleTextInputChange = (setter) => (e) => {
    const newValue = e.target.value;
    // Ensure only letters and spaces are allowed
    if (/^[A-Za-z\s]*$/.test(newValue)) {
      setter(newValue);
    }
  };

  return (
    <div className={styles.pageContainer2}>
      <div className={styles.signupDocContainer2}>
        <h2>Verify your Identity</h2>
        <p className={styles.enter}>
          Enter your registration details as accurately as possible. These are
          required to verify your account as a registered medical professional.
        </p>
        <form id="signup-form" onSubmit={handleNext}>
          <div className={styles.estnameContainer}>
            <input
              type="text"
              id="estname"
              name="estname"
              className={styles.textInput}
              placeholder="Establishment Name"
              value={establishmentName}
              onChange={handleTextInputChange(setEstablishmentName)}
              minLength="3"
              required
            />
          </div>
          <div className={styles.placeContainer}>
            <input
              type="text"
              id="place"
              name="place"
              className={styles.textInput}
              placeholder="Place of Establishment"
              value={placeOfEstablishment}
              onChange={handleTextInputChange(setPlaceOfEstablishment)}
              minLength="3"
              required
            />
          </div>
          <div className={styles.regnoContainer}>
            <input
              type="number"
              id="regno"
              name="regno"
              className={styles.textInput}
              placeholder="Registration Number"
              min="0"
              value={regnoValue}
              onChange={handleregnoChange}
              required
            />
          </div>
          <div className={styles.regcounContainer}>
            <input
              type="text"
              id="regcoun"
              name="regcoun"
              className={styles.textInput}
              placeholder="Registration Council"
              value={regCouncil}
              onChange={handleTextInputChange(setRegCouncil)}
              minLength="3"
              required
            />
          </div>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <button
            type="submit"
            className={styles.nextButton2}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Next"}
          </button>
        </form>
      </div>
      <footer className={styles.docFooter2}>
        <p className={styles.copyright}>
          <img
            src={copyrightIcon}
            alt="Copyright Icon"
            className="copyright-icon"
          />
          Copyright Nourasence 2024. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default UpdateProfileDoc2;
