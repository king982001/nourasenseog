import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const doctorToken = localStorage.getItem("DoctorToken");
  const adminToken = localStorage.getItem("AdminToken");
  const token = localStorage.getItem("token");

  if (config.headers["X-Use-Doctor-Token"]) {
    if (doctorToken) {
      config.headers.Authorization = `Bearer ${doctorToken}`;
    }
  } else if (config.headers["X-Use-Admin-Token"]) {
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
