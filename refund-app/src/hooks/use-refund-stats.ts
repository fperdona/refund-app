import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export interface Refund {
  id: string;
  title: string;
  category: "food" | "hosting" | "transport" | "services" | "other";
  value: number;
  date: string | null;
}

interface RefundsResponse {
  refunds: {
    data: Refund[];
    meta: {
      total: number;
    };
  };
}

interface CategoryStats {
  category: string;
  label: string;
  total: number;
  count: number;
}

interface RefundStats {
  totalValue: number;
  totalCount: number;
  byCategory: CategoryStats[];
  refunds: Refund[];
}

const categoryLabels: Record<string, string> = {
  food: "Alimentação",
  hosting: "Hospedagem",
  transport: "Transporte",
  services: "Serviços",
  other: "Outros",
};

function calculateStats(refunds: Refund[]): RefundStats {
  const totalValue = refunds.reduce((sum, r) => sum + r.value, 0);
  const totalCount = refunds.length;

  const categoryMap = refunds.reduce(
    (acc, refund) => {
      if (!acc[refund.category]) {
        acc[refund.category] = { total: 0, count: 0 };
      }
      acc[refund.category].total += refund.value;
      acc[refund.category].count += 1;
      return acc;
    },
    {} as Record<string, { total: number; count: number }>
  );

  const byCategory = Object.entries(categoryMap).map(([category, data]) => ({
    category,
    label: categoryLabels[category] || category,
    total: data.total,
    count: data.count,
  }));

  return { totalValue, totalCount, byCategory, refunds };
}

export function useRefundStats() {
  return useQuery({
    queryKey: ["refund-stats"],
    queryFn: async () => {
      const response = await api.get<RefundsResponse>("/refunds", {
        params: { limit: 1000 },
      });
      return calculateStats(response.data.refunds.data);
    },
  });
}
