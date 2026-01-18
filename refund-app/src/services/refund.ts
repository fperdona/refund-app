import { api } from "./api";

interface CreateRefundData {
  title: string;
  category: string;
  value: number;
  file: File;
}

export async function createRefund(data: CreateRefundData) {
  // 1. Upload do arquivo
  const formData = new FormData();
  formData.append("receiptFile", data.file);

  const receiptResponse = await api.post("/receipts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const receiptId = receiptResponse.data.receipt.id;

  // 2. Criar reembolso com o ID do receipt
  const refundResponse = await api.post("/refunds", {
    title: data.title,
    category: data.category,
    value: Math.round(data.value * 100), // converte para centavos
    receipt: receiptId,
  });

  return refundResponse.data;
}
