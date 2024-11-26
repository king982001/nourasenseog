import { useEffect, useState } from "react";
import styles from "./UpdateProfileDoc4.module.css";
import copyrightIcon from "/src/assets/Doctor/copyright.png";
import uploadIcon from "/src/assets/Doctor/camera 2.png";
import { useNavigate } from "react-router-dom";
import { useUploadProfileImage } from "../../Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const UpdateProfileDoc4 = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [loading, setLoading] = useState(false); // Loading state
  const [isUploaded, setIsUploaded] = useState(false); // State for successful upload
  const navigate = useNavigate();
  const { mutate: uploadProfileImage } = useUploadProfileImage();

  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  const handleBrowseClick = () => {
    document.getElementById("identity-document").click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file in state
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    try {
      setLoading(true);
      // Call the API to upload the profile image
      await uploadProfileImage(selectedFile, {
        onSuccess: () => {
          setIsUploaded(true); // Set the uploaded state to true
          toast.success("Profile image uploaded successfully!");
          navigate("/doctor/dashboard");
        },
        onError: () => {
          setLoading(false);
          toast.error("Failed to upload profile image. Please try again.");
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Failed to upload profile image. Please try again.", error);
    }
  };

  return (
    <div className={styles.pageContainer4}>
      <header className={styles.headerdoc4}></header>
      <div className={styles.signupDoc4Container}>
        <h2>Verify your Identity</h2>
        <p className={styles.uploadId4}>Take A Picture</p>
        <form id="signup4-form">
          <div className={styles.formGroup4}>
            <div className={styles.uploadContainer4}>
              <div className={styles.img4}>
                <img
                  src={uploadIcon}
                  alt="Upload Icon"
                  className={styles.uploadIcon4}
                />
              </div>
              <input
                type="file"
                id="identity-document"
                className={styles.identityDocument4}
                name="identity-document"
                required
                style={{ display: "none" }}
                onChange={handleFileChange} // Handle file selection
              />
              <p className={styles.dragdrop4}>
                <span className={styles.browseLink4}>
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className={styles.browseButton4}
                  >
                    Click
                  </button>
                </span>
                to take a picture
              </p>
            </div>
          </div>
          {!isUploaded && (
            <div className={styles.buttonGroup4}>
              <button type="button" className={styles.cancelButton}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          )}
          <button type="submit" className={styles.signUpButton4}>
            Update
          </button>
        </form>
      </div>
      <footer className={styles.docFooter4}>
        <p className={styles.copyright}>
          <img
            src={copyrightIcon}
            alt="Copyright Icon"
            className="copyright-icon"
          />
          Copyright Nourasense 2024 . All Rights Reserved.
        </p>
        <div></div>
      </footer>
    </div>
  );
};

export default UpdateProfileDoc4;
