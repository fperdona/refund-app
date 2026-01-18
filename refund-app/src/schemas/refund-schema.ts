import { z } from "zod";

export const refundSchema = z.object({
  title: z.string().min(2, "Mínimo 2 caracteres"),
  category: z.enum(["food", "hosting", "transport", "services", "other"], {
    message: "Selecione uma categoria",
  }),
  value: z.number().positive("Valor deve ser maior que zero"),
  file: z
    .instanceof(File, { message: "Selecione um arquivo" })
    .refine((file) => file.size <= 2 * 1024 * 1024, "Arquivo deve ter no máximo 2MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      "Formato deve ser JPG, PNG ou PDF"
    ),
});

export type RefundFormData = z.infer<typeof refundSchema>;
