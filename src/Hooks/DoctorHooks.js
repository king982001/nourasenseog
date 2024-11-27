import { useMutation, useQuery } from "@tanstack/react-query";
import api from "src/Api/api.js";
import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }) =>
      api.post("/api/v1/doctor/signin", { email, password }),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data) => api.post("/api/v1/doctor/signup", data),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data) => api.post("/api/v1/doctor/verify", data),
  });
};
export const useUpdateGeneralDetails = () => {
  return useMutation({
    mutationFn: (data) =>
      api.put("/api/v1/doctor/updateGeneralDetails", data, {
        headers: { "X-Use-Doctor-Token": true },
      }),
  });
};
export const useUpdateMedicalVerification = () => {
  return useMutation({
    mutationFn: (data) =>
      api.post("/api/v1/doctor/updateMedicalVerification", data, {
        headers: { "X-Use-Doctor-Token": true },
      }),
  });
};

export const useUploadIdProof = () => {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("idImage", file);
      const response = await api.post(
        "/api/v1/doctor/uploadIdProof",
        formData,
        {
          headers: { "X-Use-Doctor-Token": true },
        },
      );
      return response.data;
    },
  });
};
export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("profileImage", file);
      const response = await api.post(
        "/api/v1/doctor/uploadProfileImage",
        formData,
        {
          headers: { "X-Use-Doctor-Token": true },
        },
      );
      return response.data;
    },
  });
};

export const useResetPasswordSendOtp = () => {
  return useMutation({
    mutationFn: (email) =>
      api.post("/api/v1/doctor/forgotPasswordSendVerificationOtp", { email }),
  });
};
export const useResetPasswordVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }) =>
      api.post("/api/v1/doctor/verifyOtpForPasswordReset", { email, otp }),
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ email, password, confirmPassword }) =>
      api.post("/api/v1/doctor/resetPassword", {
        email,
        password,
        confirmPassword,
      }),
  });
};

export const usePatients = () => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get("/api/v1/doctor/getPatientsByDoctor", {
        headers: { "X-Use-Doctor-Token": true },
      });
      return response.data;
    },
    queryKey: ["patients"],
    select: (data) => data.data.patients,
  });
};

export const useDeletePatient = () => {
  return useMutation({
    mutationFn: (patientId) =>
      api.delete(`/api/v1/doctor/deletePatient/${patientId}`, {
        headers: { "X-Use-Doctor-Token": true },
      }),
  });
};

export const useAddPatient = () => {
  return useMutation({
    mutationFn: (patientData) =>
      api.post("/api/v1/doctor/addPatient", patientData, {
        headers: { "X-Use-Doctor-Token": true },
      }),
  });
};

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: ({ appointmentData, patientId }) =>
      api.post(
        `/api/v1/doctor/createAppointMent/${patientId}`,
        appointmentData,
        {
          headers: { "X-Use-Doctor-Token": true },
        },
      ),
  });
};

export const useAppointments = () => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get(
        "/api/v1/doctor/getAppointmentsCreatedByDoctor",
        {
          headers: { "X-Use-Doctor-Token": true },
        },
      );
      return response.data;
    },

    queryKey: ["appointments"],
    select: (data) => data.data.appointments,
  });
};

export const useDiagnoseHistory = (patientId) => {
  return useQuery({
    queryKey: ["diagnoseHistory", patientId],
    queryFn: async () => {
      if (!patientId) {
        throw new Error("Patient ID is required");
      }
      const response = await axios.get(
        `https://diagnostics-app-4n9ac.ondigitalocean.app/diagnosis-history?id_num=${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("DoctorToken")}`,
          },
        },
      );
      return response.data;
    },
    enabled: !!patientId, // Only fetch if patientId is defined
  });
};

export const useReportHistory = (patientId) => {
  return useQuery({
    queryFn: async () => {
      if (!patientId) {
        throw new Error("Patient ID is required");
      }
      const response = await axios.get(
        `https://diagnostics-app-4n9ac.ondigitalocean.app/report-history?id_num=${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("DoctorToken")}`,
          },
        },
      );
      return response.data;
    },
    queryKey: ["reportHistory", patientId],
    enabled: !!patientId,
  });
};

export const useDiagnose = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `https://diagnostics-app-4n9ac.ondigitalocean.app/diagnosis`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("DoctorToken")}`,
          },
        },
      );
      return response.data;
    },
  });
};
export const useReport = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `https://diagnostics-app-4n9ac.ondigitalocean.app/report`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("DoctorToken")}`,
          },
        },
      );
      return response.data;
    },
  });
};
