import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

interface Receipt {
  id: string;
  originalFilename: string;
  filename: string;
  path: string;
  extname: string;
}

interface Refund {
  id: string;
  title: string;
  category: "food" | "hosting" | "transport" | "services" | "other";
  value: number;
  createdAt: string;
  receipt: Receipt;
}

interface RefundResponse {
  refund: Refund;
}

export function useRefund(id: string) {
  return useQuery({
    queryKey: ["refund", id],
    queryFn: async () => {
      const response = await api.get<RefundResponse>(`/refunds/${id}`);
      return response.data.refund;
    },
    enabled: !!id,
  });
}
