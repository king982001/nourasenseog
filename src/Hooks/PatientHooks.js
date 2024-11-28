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

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }) =>
      api.post("/api/v1/parent/verify", { email, otp }),
  });
};

const fetchChildrens = async () => {
  const response = await api.get("/api/v1/parent/getChildListByParent");
  return response.data;
};

export const useChildrens = () => {
  return useQuery({
    queryFn: fetchChildrens,
    queryKey: ["childrens"],
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
