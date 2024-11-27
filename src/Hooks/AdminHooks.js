import { useMutation, useQuery } from "@tanstack/react-query";
import api from "src/Api/api.js";

export const useLogin = () => {
  return useMutation({
    mutationFn: (loginData) => api.post("/api/v1/admin/login", loginData),
  });
};

const fetchStatistics = async () => {
  const response = await api.get("/api/v1/admin/getStatistics", {
    headers: { "X-Use-Admin-Token": true },
  });
  return response.data;
};

export const useGetStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: fetchStatistics,
  });
};
const fetchAllDoctors = async () => {
  const response = await api.get("/api/v1/admin/getAllDoctors", {
    headers: { "X-Use-Admin-Token": true },
  });
  return response.data;
};

export const useAllDoctors = () => {
  return useQuery({
    queryKey: ["Doctors"],
    queryFn: fetchAllDoctors,
  });
};

const fetchDoctorById = async (doctorID) => {
  const response = await api.get(`/api/v1/admin/getDoctorDetails/${doctorID}`, {
    headers: { "X-Use-Admin-Token": true },
  });
  return response.data;
};

export const useDoctorById = (doctorID) => {
  return useQuery({
    queryKey: ["Doctor", doctorID],
    queryFn: () => fetchDoctorById(doctorID),
    enabled: !!doctorID,
  });
};

export const useVerifyDoctor = () => {
  return useMutation({
    mutationFn: (doctorId) =>
      api.put(
        `/api/v1/admin/verifyDoctor/${doctorId}`,
        {},
        {
          headers: { "X-Use-Admin-Token": true },
        },
      ),
  });
};
