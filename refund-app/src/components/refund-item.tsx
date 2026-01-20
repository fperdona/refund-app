import { Link } from "react-router";
import ForkKnife from "../assets/icons/fork-knife.svg?react";
import Bed from "../assets/icons/bed.svg?react";
import PoliceCar from "../assets/icons/police-car.svg?react";
import Wrench from "../assets/icons/wrench.svg?react";
import Receipt from "../assets/icons/receipt.svg?react";

const categoryConfig = {
  food: { icon: ForkKnife, label: "Alimentação" },
  hosting: { icon: Bed, label: "Hospedagem" },
  transport: { icon: PoliceCar, label: "Transporte" },
  services: { icon: Wrench, label: "Serviços" },
  other: { icon: Receipt, label: "Outros" },
};

interface RefundItemProps {
  id: string;
  title: string;
  category: keyof typeof categoryConfig;
  value: number;
}

export default function RefundItem({
  id,
  title,
  category,
  value,
}: RefundItemProps) {
  const { icon: Icon, label } = categoryConfig[category];

  const formattedValue = (value / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Link to={`/reembolso/${id}`} className="flex items-center justify-between py-3 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 fill-green-100" />
        </div>
        <div>
          <p className="font-bold text-sm text-gray-100">{title}</p>
          <p className="text-xs text-gray-200">{label}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs text-gray-200">R$ </span>
        <span className="text-sm font-semibold text-gray-100">
          {formattedValue.replace("R$", "").trim()}
        </span>
      </div>
    </Link>
  );
}
