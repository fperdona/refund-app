import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
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
  date: string | null;
  createdAt: string;
  receipt: Receipt;
}

interface RefundResponse {
  refund: Refund;
}

interface CreateRefundData {
  title: string;
  category: string;
  value: number;
  date: string;
  file: File;
}

interface UpdateRefundData {
  title: string;
  category: string;
  value: number;
  date: string;
  file?: File;
}

export function useRefund(id?: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["refund", id],
    queryFn: async () => {
      const response = await api.get<RefundResponse>(`/refunds/${id}`);
      return response.data.refund;
    },
    enabled: !!id,
  });

  async function createRefund(data: CreateRefundData) {
    try {
      const formData = new FormData();
      formData.append("receiptFile", data.file);

      const receiptResponse = await api.post("/receipts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const receiptId = receiptResponse.data.receipt.id;

      await api.post("/refunds", {
        title: data.title,
        category: data.category,
        value: Math.round(data.value * 100),
        date: data.date,
        receipt: receiptId,
      });

      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      toast.success("Solicitação de reembolso criada com sucesso");
      navigate("/sucesso");
    } catch (error) {
      toast.error("Erro ao criar solicitação");
      throw error;
    }
  }

  async function deleteRefund(refundId: string) {
    try {
      await api.delete(`/refunds/${refundId}`);
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      toast.success("Solicitação de reembolso excluída com sucesso");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao excluir solicitação");
      throw error;
    }
  }

  async function updateRefund(refundId: string, data: UpdateRefundData) {
    try {
      let receiptId: string | undefined;

      if (data.file) {
        const formData = new FormData();
        formData.append("receiptFile", data.file);

        const receiptResponse = await api.post("/receipts", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        receiptId = receiptResponse.data.receipt.id;
      }

      await api.put(`/refunds/${refundId}`, {
        title: data.title,
        category: data.category,
        value: Math.round(data.value * 100),
        date: data.date,
        ...(receiptId && { receipt: receiptId }),
      });

      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      queryClient.invalidateQueries({ queryKey: ["refund", refundId] });
      queryClient.invalidateQueries({ queryKey: ["refund-stats"] });
      toast.success("Solicitação de reembolso atualizada com sucesso");
      navigate(`/reembolso/${refundId}`);
    } catch (error) {
      toast.error("Erro ao atualizar solicitação");
      throw error;
    }
  }

  return {
    refund: data,
    isLoading,
    createRefund,
    deleteRefund,
    updateRefund,
  };
}
