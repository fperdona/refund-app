import InputText from "../core-components/input-text";
import ButtonIcon from "../core-components/button-icon";
import MagnifyingGlass from "../assets/icons/magnifying-glass.svg?react";

export default function Solicitacoes() {
  return (
    <div className="bg-white rounded-2xl p-8">
      <h1 className="text-xl font-bold text-gray-200 mb-6">Solicitações</h1>

      {/* Busca */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1">
          <InputText placeholder="Pesquisar pelo nome" />
        </div>
        <ButtonIcon icon={MagnifyingGlass} />
      </div>
    </div>
  );
}
