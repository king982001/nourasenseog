import { useMutation } from "@tanstack/react-query";
import api from "src/Api/api.js";

export const useFeedback = () => {
  return useMutation({
    mutationFn: (data) => api.post("/api/v1/user/sendEmailFeedBack", data),
  });
};
