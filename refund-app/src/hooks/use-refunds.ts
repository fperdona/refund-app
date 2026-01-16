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

export function useRefunds(page = 1, search = "") {
  return useQuery({
    queryKey: ["refunds", page, search],
    queryFn: async () => {
      const response = await api.get<RefundsResponse>("/refunds", {
        params: { page, q: search || undefined },
      });
      return response.data.refunds;
    },
    placeholderData: (previousData) => previousData,
  });
}
