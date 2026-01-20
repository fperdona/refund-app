import * as Dialog from "@radix-ui/react-dialog";
import Button from "../core-components/button";

interface ConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function ConfirmModal({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    isLoading = false,
}: ConfirmModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-[#1D211C]/80" />
                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 w-full max-w-lg shadow-lg">
                    <Dialog.Title className="text-xl font-bold text-gray-100">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-200 mt-2">
                        {description}
                    </Dialog.Description>

                    <div className="flex items-center justify-end gap-8 mt-6">
                        <button
                            onClick={() => onOpenChange(false)}
                            className="text-green-100 hover:text-green-200 font-semibold cursor-pointer"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <div className="w-36">
                            <Button onClick={onConfirm} disabled={isLoading}>
                                {isLoading ? "Excluindo..." : "Confirmar"}
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
