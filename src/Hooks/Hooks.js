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
