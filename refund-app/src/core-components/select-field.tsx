import * as Select from "@radix-ui/react-select";
import CaretDown from "../assets/icons/caret-down.svg?react";
import Check from "../assets/icons/check.svg?react";
import { useState } from "react";

interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export default function SelectField({
  label,
  placeholder = "Selecione",
  options,
  value,
  onValueChange,
  disabled = false,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={`text-2xs font-semibold uppercase tracking-wide ${open ? "text-green-100" : "text-gray-200"
            }`}
        >
          {label}
        </label>
      )}
      <Select.Root
        value={value}
        onValueChange={onValueChange}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
      >
        <Select.Trigger
          className={`group flex text-sm items-center justify-between h-12 px-4 border border-gray-300 rounded-lg bg-transparent text-gray-200 outline-none ${disabled ? "cursor-default" : "cursor-pointer data-[state=open]:border-green-100"
            }`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <CaretDown className="w-5 h-5 fill-gray-300 transition-transform group-data-[state=open]:rotate-180" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={4}
            className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-[var(--radix-select-trigger-width)]"
          >
            <Select.Viewport className="p-2">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="flex items-center justify-between text-sm px-4 py-3 cursor-pointer outline-none hover:font-bold data-[state=checked]:font-bold"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="w-5 h-5 fill-green-100" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
