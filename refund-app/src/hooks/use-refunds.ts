import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

interface Refund {
  id: string;
  title: string;
  category: "food" | "hosting" | "transport" | "services" | "other";
  value: number;
  created_at: string;
}

interface RefundsResponse {
  refunds: {
    data: Refund[];
    meta: {
      total: number;
      currentPage: number;
      lastPage: number;
    };
  };
}

interface DateFilter {
  startDate?: string;
  endDate?: string;
}

export function useRefunds(page = 1, search = "", dateFilter?: DateFilter) {
  return useQuery({
    queryKey: ["refunds", page, search, dateFilter?.startDate, dateFilter?.endDate],
    queryFn: async () => {
      const response = await api.get<RefundsResponse>("/refunds", {
        params: {
          page,
          q: search || undefined,
          startDate: dateFilter?.startDate || undefined,
          endDate: dateFilter?.endDate || undefined,
        },
      });
      return response.data.refunds;
    },
    placeholderData: (previousData) => previousData,
  });
}
