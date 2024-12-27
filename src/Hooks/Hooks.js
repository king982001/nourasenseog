import { useMutation, useQuery } from "@tanstack/react-query";
import api from "src/Api/api.js";
import axios from "axios";

export const useFeedback = () => {
  return useMutation({
    mutationFn: (data) => api.post("/api/v1/user/sendEmailFeedBack", data),
  });
};

export const useNutrition = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/nutrition`,
        data,
      );
      return response.data;
    },
  });
};

export const useGraphMeasurements = (id_num) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL_LLM}/get-measurements?id_num=${id_num}`,
      );
      return response.data;
    },
    queryKey: ["graphMeasurements", id_num],
  });
};
