import { useCallback, useState } from "react";
import { useQueryState } from "nuqs";
import InputText from "../core-components/input-text";
import ButtonIcon from "../core-components/button-icon";
import MagnifyingGlass from "../assets/icons/magnifying-glass.svg?react";
import { debounce } from "../helpers/utils";

export default function RefundsSearch() {
  const [, setSearch] = useQueryState("q", { defaultValue: "" });
  const [inputValue, setInputValue] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearch = useCallback(
    debounce((value: string) => setSearch(value), 500),
    [setSearch]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  }

  return (
    <div className="flex gap-2 mb-6">
      <div className="flex-1">
        <InputText
          placeholder="Pesquisar pelo nome"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <ButtonIcon icon={MagnifyingGlass} />
    </div>
  );
}
