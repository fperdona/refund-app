import { useCallback, useState } from "react";
import { useQueryState } from "nuqs";
import InputText from "../core-components/input-text";
import ButtonIcon from "../core-components/button-icon";
import MagnifyingGlass from "../assets/icons/magnifying-glass.svg?react";
import { debounce } from "../helpers/utils";

export default function RefundsSearch() {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });

  const [inputValue, setInputValue] = useState(search);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearch = useCallback(
    debounce((value: string) => setSearch(value), 500),
    [setSearch]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3 || value.length === 0) {
      debouncedSetSearch(value);
    }
  }

  return (
    <div className="flex gap-2 flex-1 items-end">
      <div className="flex-1">
        <InputText
          label="Buscar"
          placeholder="Pesquisar pelo nome"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <ButtonIcon icon={MagnifyingGlass} />
    </div>
  );
}
