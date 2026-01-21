import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { refundEditSchema, type RefundEditFormData } from "../schemas/refund-schema";
import InputText from "../core-components/input-text";
import SelectField from "../core-components/select-field";
import Button from "../core-components/button";
import { useState } from "react";
import { useRefund } from "../hooks/use-refund";
import { useParams, useNavigate } from "react-router";

interface EditFormProps {
  refund: {
    id: string;
    title: string;
    category: "food" | "hosting" | "transport" | "services" | "other";
    value: number;
    date: string | null;
  };
  onSubmit: (data: RefundEditFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

function EditForm({ refund, onSubmit, onCancel, isSubmitting }: EditFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RefundEditFormData>({
    resolver: zodResolver(refundEditSchema),
    defaultValues: {
      title: refund.title,
      category: refund.category,
      value: refund.value / 100,
      date: refund.date || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <InputText
          label="Nome da solicitação"
          placeholder="Ex: Almoço reunião"
          {...register("title")}
        />
        {errors.title && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Categoria"
                placeholder="Selecione"
                options={[
                  { value: "food", label: "Alimentação" },
                  { value: "hosting", label: "Hospedagem" },
                  { value: "transport", label: "Transporte" },
                  { value: "services", label: "Serviços" },
                  { value: "other", label: "Outros" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          {errors.category && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.category.message}
            </span>
          )}
        </div>

        <div className="flex-1">
          <InputText
            label="Valor"
            placeholder="0,00"
            type="number"
            step="0.01"
            {...register("value", { valueAsNumber: true })}
          />
          {errors.value && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.value.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <InputText
          label="Data da despesa"
          type="date"
          {...register("date")}
        />
        {errors.date && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.date.message}
          </span>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <Button type="button" onClick={onCancel} variant="secondary" className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}

export default function EditRefund() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { refund, isLoading, updateRefund } = useRefund(id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleCancel() {
    navigate(`/reembolso/${id}`);
  }

  async function handleSubmitForm(data: RefundEditFormData) {
    if (!id) return;
    try {
      setIsSubmitting(true);
      await updateRefund(id, data);
    } catch (error) {
      console.error("Erro ao atualizar reembolso:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-8 mt-4">
          <p className="text-gray-200">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!refund) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-8 mt-4">
          <p className="text-gray-200">Reembolso não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl p-8 mt-4">
        <h1 className="text-xl font-bold text-gray-100 mb-2">
          Editar solicitação de reembolso
        </h1>
        <p className="text-gray-200 mb-6 text-sm">
          Atualize os dados da despesa.
        </p>

        <EditForm
          refund={refund}
          onSubmit={handleSubmitForm}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
