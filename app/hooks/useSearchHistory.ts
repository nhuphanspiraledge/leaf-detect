import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearchHistory = (
  username: string,
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ["SEARCH_HISTORY", username, startDate, endDate],
    enabled: !!username && !!startDate && !!endDate,
    queryFn: async () => {
      const response = await axios.get(
        `/predict/history/${username}/search`,
        {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
        }
      );
      return response.data;
    },
  });
};
