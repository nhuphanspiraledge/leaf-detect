// hooks/useExport.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useExport = () => {
  return useMutation({
    mutationFn: async (recordId: number) => {
      const response = await axios.get(
        `/predict/history/detail/${recordId}/export`,
        { responseType: "blob" }
      );
      return response.data;
    },
  });
};
