import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateProfileDoc3.module.css";
import copyrightIcon from "src/assets/Doctor/copyright.png";
import uploadIcon from "src/assets/Doctor/file.png";
import { useUploadIdProof } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";

const UpdateProfileDoc3 = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false); // New state for tracking successful upload
  const navigate = useNavigate();
  const { mutate: uploadIdProof } = useUploadIdProof();

  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (!selectedFile && !isUploaded) {
      toast.error("Please upload a file before proceeding.");
      return;
    }
    navigate("/doctor/updateprofiledoc4");
  };

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
      // Call the API to upload the ID proof
      uploadIdProof(selectedFile, {
        onSuccess: (response) => {
          toast.success("Id Uploaded successfully.");
          navigate("/doctor/updateProfileDoc4");
        },
        onError: (error) => {
          toast.error("Could not upload the file.");
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Failed to upload ID. Please try again.", error);
    }
  };

  return (
    <div className={styles.pageContainer3}>
      <div className={styles.signupDoc3Container}>
        <h2>Verify your Identity</h2>
        <p className={styles.uploadId3}>Upload ID</p>
        <form id="signup3-form">
          <div className={styles.formGroup}>
            <div className={styles.uploadContainer3}>
              <div className={styles.camimg}>
                <img
                  src={uploadIcon}
                  alt="Upload Icon"
                  className={styles.uploadIcon3}
                />
              </div>
              <input
                type="file"
                id="identity-document"
                className={styles.identityDocument}
                name="identity-document"
                required
                style={{ display: "none" }}
                onChange={handleFileChange} // Handle file selection
              />
              <p className={styles.dragdrop3}>
                Drag & Drop or{" "}
                <span className={styles.browseLink3}>
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className={styles.browseButton3}
                  >
                    Browse
                  </button>
                </span>
              </p>
              <p className={styles.accFile3}>
                Accepted formats: PDF, PNG, JPEG, JPG
              </p>
            </div>
          </div>
          {!isUploaded && (
            <div className={styles.buttonGroup3}>
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
          <button
            type="submit"
            className={styles.nextButton3}
            onClick={handleNext}
          >
            Next
          </button>
        </form>
      </div>
      <footer className={styles.docFooter3}>
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

export default UpdateProfileDoc3;
