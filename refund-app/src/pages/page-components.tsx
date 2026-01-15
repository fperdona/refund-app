import Text from "../core-components/text";
import Icon from "../core-components/icon";
import Bed from "../assets/icons/bed.svg?react";
import CaretLeft from "../assets/icons/caret-left.svg?react";
import CaretRight from "../assets/icons/caret-right.svg?react";
import CloudArrowUp from "../assets/icons/cloud-arrow-up.svg?react";
import DesktopTower from "../assets/icons/desktop-tower.svg?react";
import ForkKnife from "../assets/icons/fork-knife.svg?react";
import MagnifyingGlass from "../assets/icons/magnifying-glass.svg?react";
import PoliceCar from "../assets/icons/police-car.svg?react";
import Receipt from "../assets/icons/receipt.svg?react";
import Wrench from "../assets/icons/wrench.svg?react";
import Button from "../core-components/button";
import ButtonIcon from "../core-components/button-icon";
import InputText from "../core-components/input-text";
import NavLink from "../core-components/nav-link";
import SelectField from "../core-components/select-field";

export default function Components() {
  return (
    <div className="flex flex-col gap-4 bg-gray-500 p-10 rounded-2xl">
      <div className="flex gap-2">
        <Text className="text-xl font-bold">Componentes</Text>
      </div>

      <div className="flex flex-col gap-2">
        <Text className="text-sm font-bold pr-2">Icones: </Text>
        <div className="flex">
          <Icon svg={Bed} className="fill-green-100" />
          <Icon svg={CaretLeft} className="fill-green-100" />
          <Icon svg={CaretRight} className="fill-green-100" />
          <Icon svg={CloudArrowUp} className="fill-green-100" />
          <Icon svg={DesktopTower} className="fill-green-100" />
          <Icon svg={ForkKnife} className="fill-green-100" />
          <Icon svg={MagnifyingGlass} className="fill-green-100" />
          <Icon svg={PoliceCar} className="fill-green-100" />
          <Icon svg={Receipt} className="fill-green-100" />
          <Icon svg={Wrench} className="fill-green-100" />
        </div>
      </div>

      <div className="w-80 flex flex-col gap-2">
        <Text className="text-sm font-bold">Botões: </Text>
        <Button>Agendar</Button>
        <Button disabled>Agendar</Button>
      </div>

      <div className="flex flex-col gap-2">
        <Text className="text-sm font-bold">Botões com icone: </Text>
        <ButtonIcon icon={MagnifyingGlass} />
        <ButtonIcon icon={MagnifyingGlass} disabled />
      </div>
      <div className="w-80 flex flex-col gap-2">
        <Text className="text-sm font-bold">SelectField: </Text>
        <SelectField
          label="CATEGORIA"
          placeholder="Selecione"
          options={[
            { value: "alimentacao", label: "Alimentação" },
            { value: "hospedagem", label: "Hospedagem" },
            { value: "transporte", label: "Transporte" },
            { value: "servicos", label: "Serviços" },
            { value: "outros", label: "Outros" },
          ]}
        />
      </div>
      <div className="w-80 flex flex-col gap-2">
        <Text className="text-sm font-bold">Inputs: </Text>
        <InputText placeholder="Helena Souza" label="Título" />
      </div>

      <div className="flex flex-col gap-2">
        <Text className="text-sm font-bold">Nav Link: </Text>
        <div className="flex gap-2">
          <NavLink href="#">Link</NavLink>
          <NavLink href="#" active>
            Link
          </NavLink>
        </div>
      </div>
    </div>
  );
}
