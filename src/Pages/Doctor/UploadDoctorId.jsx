import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadIdProof } from "src/Hooks/DoctorHooks.js";
import toast from "react-hot-toast";
import uploadIcon from "src/assets/Doctor/file.png";

const UploadDoctorId = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();
  const { mutate: uploadIdProof } = useUploadIdProof();

  useEffect(() => {
    document.title = "Nourasense - Profile";
  }, []);

  const handleBrowseClick = () => {
    document.getElementById("identity-document").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setIsUploaded(false); // Reset upload status until the user clicks upload
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    const toastId = toast.loading("Please wait...");

    setLoading(true);
    uploadIdProof(selectedFile, {
      onSuccess: () => {
        setIsUploaded(true);
        toast.success("ID uploaded successfully.", { id: toastId });
        navigate("/doctor/upload-profile");
      },
      onError: () => {
        toast.error("Could not upload the file.", { id: toastId });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Verify Your Identity
        </h2>
        <p className="text-lg text-center text-gray-600 mb-6">
          Upload your ID proof for verification.
        </p>

        <form id="signup3-form">
          <div className="mb-4">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4">
                <img
                  src={uploadIcon}
                  alt="Upload Icon"
                  className="w-20 h-20 text-gray-500"
                />
              </div>
              <input
                type="file"
                id="identity-document"
                className="hidden"
                name="identity-document"
                required
                onChange={handleFileChange}
              />
              <p className="text-sm text-center text-gray-600 mb-2">
                Drag & Drop or{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handleBrowseClick}
                >
                  Browse
                </span>
              </p>
              <p className="text-xs text-center text-gray-400 mb-4">
                Accepted formats: PDF, PNG, JPEG, JPG
              </p>
            </div>

            {/* Image Preview */}
            {selectedFile && (
              <div className="flex flex-col items-center mb-6">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-full h-auto max-w-xs rounded-lg mb-2"
                />
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedFile(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${
                loading || !selectedFile
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-2 px-6 rounded-md`}
              onClick={handleUpload}
              disabled={loading || !selectedFile}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDoctorId;
