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
        }
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
        }
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

export const usePatients = (page) => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get(
        `/api/v1/doctor/getPatientsByDoctor?page=${page}`,
        {
          headers: { "X-Use-Doctor-Token": true },
        }
      );
      return response.data;
    },
    queryKey: ["patients"],
  });
};
export const usePatientById = (id) => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get(`/api/v1/doctor/getPatientById/${id}`, {
        headers: { "X-Use-Doctor-Token": true },
      });
      return response.data;
    },
    enabled: !!id,
    queryKey: ["patient", id],
    select: (data) => data?.data.patient,
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
export const useAddPatientByPatientId = () => {
  return useMutation({
    mutationFn: (patientId) =>
      api.post(`/api/v1/doctor/addChildByCustomId/${patientId}`, {
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
        }
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
        }
      );
      return response.data;
    },

    queryKey: ["appointments"],
    select: (data) => data.data.appointments,
  });
};
export const useAppointmentsByPatient = (id) => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get(
        `/api/v1/parent/getAppointmentsByPatientId/${id}`
      );
      return response.data;
    },

    queryKey: ["appointments"],
    select: (data) => data.data.appointments,
  });
};

export const useDiagnoseHistory = (patientId, page = 1) => {
  return useQuery({
    queryKey: ["diagnoseHistory", patientId],
    queryFn: async () => {
      if (!patientId) {
        throw new Error("Patient ID is required");
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/diagnosis-history?child_id=${patientId}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("DoctorToken")}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!patientId, // Only fetch if patientId is defined
  });
};

export const useUpdateDoctorGeneralDetails = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/api/v1/doctor/updateDetails", data);
      return response.data;
    },
  });
};

export const useChartData = (age, gender) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/graph-data?child_age=${age}&child_gender=${gender}`
      );
      return response.data;
    },
    queryKey: ["chartData"],
  });
};

export const useFoodSearch = () => {
  return useMutation({
    mutationFn: async (query) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/food-search?food_name=${query}`
      );
      return response.data;
    },
  });
};

export const useCreateDietPlan = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/diet-plan`,
        data
      );
      return response.data;
    },
  });
};

export const useCalculateMPH = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/mid-parent-height`,
        data
      );
      return response.data;
    },
  });
};

export const useGetMPH = (childId) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/get-mid-parent-height?child_id=${childId}`
      );
      return response.data;
    },
    queryKey: ["midParentHeight"],
  });
};

export const useDoctorProfile = () => {
  return useQuery({
    queryFn: async () => {
      console.log("Please Wait");

      const response = await api.get("/api/v1/doctor/getProfile", {
        headers: { "X-Use-Doctor-Token": true },
      });
      console.log(response);
      return response.data;
    },
    queryKey: ["profile"],
  });
};

export const useBuySubscription = () => {
  return useMutation({
    mutationFn: async ({ isMonthly, planId }) => {
      const response = await api.post(
        `/api/v1/payment/createOrder/${planId}`,
        {
          monthly: isMonthly,
        },
        {
          headers: { "X-Use-Doctor-Token": true },
        }
      );
      return response.data;
    },
  });
};

export const useGetEmailsInSubscription = () => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get(
        `/api/v1/doctor/getAllEmailsOfSubscriptions`,
        {
          headers: { "X-Use-Doctor-Token": true },
        }
      );
      return response.data;
    },
    queryKey: ["emails"],
  });
};

export const useInviteEmailToSubscription = () => {
  return useMutation({
    mutationFn: async ({ subscriptionId, email }) => {
      const response = await api.post(
        `/api/v1/doctor/sendInviteToSubscription/${subscriptionId}`,
        { email },
        {
          headers: { "X-Use-Doctor-Token": true },
        }
      );
      return response.data;
    },
  });
};