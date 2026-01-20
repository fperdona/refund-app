import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { refundSchema, type RefundFormData } from "../schemas/refund-schema";
import InputText from "../core-components/input-text";
import SelectField from "../core-components/select-field";
import Button from "../core-components/button";
import CloudArrowUp from "../assets/icons/cloud-arrow-up.svg?react";
import { useRef, useState } from "react";
import { useRefund } from "../hooks/use-refund";



export default function NewRefund() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createRefund } = useRefund();
  const [isSubmitting, setIsSubmitting] = useState(false);



  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RefundFormData>({
    resolver: zodResolver(refundSchema),
  });

  const selectedFile = watch("file");

  async function onSubmit(data: RefundFormData) {
    try {
      setIsSubmitting(true);
      await createRefund(data);
    } catch (error) {
      console.error("Erro ao criar reembolso:", error);
    } finally {
      setIsSubmitting(false);
    }
  }



  function handleFileClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file, { shouldValidate: true });
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl p-8 mt-4">
        <h1 className="text-xl font-bold text-gray-100 mb-2">
          Nova solicitação de reembolso
        </h1>
        <p className="text-gray-200 mb-6 text-sm">
          Dados da despesa para solicitar reembolso.
        </p>

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
            <label className="text-2xs font-semibold uppercase tracking-wide text-gray-200 block mb-2">
              Comprovante
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg h-12 pl-4">
              <span className="text-sm text-gray-200 flex-1">
                {selectedFile?.name || "Nome do arquivo.pdf"}
              </span>
              <button
                type="button"
                onClick={handleFileClick}
                className="w-12 h-12 bg-green-100 hover:bg-green-200 rounded flex items-center justify-center cursor-pointer"
              >
                <CloudArrowUp className="w-4 h-4 fill-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {errors.file && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.file.message}
              </span>
            )}
          </div>


          <Button type="submit" disabled={isSubmitting} className="mt-4">
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>

        </form>
      </div>
    </div>
  );
}
