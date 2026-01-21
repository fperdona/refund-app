import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useRefund } from "../hooks/use-refund";
import { api } from "../services/api";
import InputText from "../core-components/input-text";
import SelectField from "../core-components/select-field";
import Button from "../core-components/button";
import ConfirmModal from "../components/confirm-modal";
import MagnifyingGlass from "../assets/icons/magnifying-glass.svg?react";

const categoryOptions = [
    { value: "food", label: "Alimentação" },
    { value: "hosting", label: "Hospedagem" },
    { value: "transport", label: "Transporte" },
    { value: "services", label: "Serviços" },
    { value: "other", label: "Outros" },
];

export default function RefundDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { refund, isLoading, deleteRefund } = useRefund(id || "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    function handleEdit() {
        navigate(`/reembolso/${id}/editar`);
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

    const formattedValue = (refund.value / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
    });

    async function handleOpenReceipt() {
        if (refund?.receipt?.id) {
            try {
                const response = await api.get(`/receipts/download/${refund.receipt.id}`);
                window.open(`http://localhost:3333${response.data.url}`, "_blank");
            } catch (error) {
                console.error("Erro ao abrir comprovante:", error);
            }
        }
    }

    function handleDelete() {
        setIsModalOpen(true);
    }

    async function confirmDelete() {
        if (refund?.id) {
            setIsDeleting(true);
            await deleteRefund(refund.id);
            setIsDeleting(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-8 mt-4">
                <h1 className="text-xl font-bold text-gray-100 mb-2">
                    Solicitação de reembolso
                </h1>
                <p className="text-gray-200 mb-6 text-sm">
                    Dados da despesa para solicitar reembolso.
                </p>

                <div className="flex flex-col gap-4">
                    <InputText
                        label="Nome da solicitação"
                        value={refund.title}
                        readOnly
                    />

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <SelectField
                                label="Categoria"
                                options={categoryOptions}
                                value={refund.category}
                                disabled
                            />
                        </div>

                        <div className="flex-1">
                            <InputText
                                label="Valor"
                                value={formattedValue}
                                readOnly
                            />
                        </div>
                    </div>

                    <InputText
                        label="Data da despesa"
                        value={refund.date ? refund.date.split("-").reverse().join("/") : "-"}
                        readOnly
                    />

                    <Button onClick={handleOpenReceipt} variant="secondary">
                        <MagnifyingGlass className="w-5 h-5 mr-2 fill-green-100" />
                        Abrir comprovante
                    </Button>

                    <div className="flex gap-3">
                        <Button onClick={handleEdit} className="flex-1">
                            Editar
                        </Button>
                        <Button onClick={handleDelete} variant="danger" className="flex-1">
                            Excluir
                        </Button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                title="Excluir solicitação"
                description="Tem certeza que deseja excluir essa solicitação? Essa ação é irreversível."
                onConfirm={confirmDelete}
                isLoading={isDeleting}
            />
        </div>
    );
}
