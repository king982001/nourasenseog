import { useMutation, useQuery } from "@tanstack/react-query";
import api from "src/Api/api.js";
import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }) =>
      api.post("/api/v1/parent/signin", { email, password }),
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: ({ email, password }) =>
      api.post("/api/v1/parent/signup", { email, password }),
  });
};

export const useSaveGeneralDetails = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(
        "/api/v1/parent/updateGeneralDetails",
        data,
      );
      return response.data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }) =>
      api.post("/api/v1/parent/verify", { email, otp }),
  });
};

const fetchChildrens = async (page) => {
  const response = await api.get(
    `/api/v1/parent/getChildListByParent?page=${page}`,
  );
  return response.data;
};

export const useChildrens = (page = 1) => {
  return useQuery({
    queryFn: () => fetchChildrens(page), // Pass `page` to your fetch function
    queryKey: ["childrens", page], // Include `page` in the query key
    keepPreviousData: true, // Retain previous data while fetching new data
  });
};

export const useChildrenById = (id) => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get(`/api/v1/parent/getChildById/${id}`);
      return response.data;
    },
    enabled: !!id,
    queryKey: ["patient", id],
    select: (data) => data?.data.child,
  });
};

export const useAddChild = () => {
  return useMutation({
    mutationFn: (data) => api.post("/api/v1/parent/createChildProfile", data),
  });
};

export const useDiagnose = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/diagnosis`,
        data,
      );
      return response.data;
    },
  });
};

const fetchAppointments = async (id) => {
  const response = await api.get(
    `/api/v1/parent/getAppointmentsByPatientId/${id}`,
  );
  return response.data;
};

export const useAppointment = (id) => {
  return useQuery({
    queryFn: async (id) => fetchAppointments(id),
    queryKey: ["childAppointments"],
  });
};

export const useResetPasswordSendOtp = () => {
  return useMutation({
    mutationFn: (email) =>
      api.post("/api/v1/parent/forgotPasswordSendVerificationOtp", { email }),
  });
};
export const useResetPasswordVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }) =>
      api.post("/api/v1/parent/verifyOtpForPasswordReset", { email, otp }),
  });
};
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ email, password, confirmPassword }) =>
      api.post("/api/v1/parent/resetPassword", {
        email,
        password,
        confirmPassword,
      }),
  });
};
