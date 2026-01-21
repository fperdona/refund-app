import { useState, useEffect } from "react";
import SelectField from "../core-components/select-field";
import InputText from "../core-components/input-text";

interface DateFilter {
  startDate: string;
  endDate: string;
}

interface RefundsDateFilterProps {
  onFilterChange: (filter: DateFilter) => void;
}

const periodOptions = [
  { value: "all", label: "Todos" },
  { value: "this-month", label: "Este mês" },
  { value: "last-3-months", label: "Últimos 3 meses" },
  { value: "this-year", label: "Este ano" },
  { value: "custom", label: "Personalizado" },
];

function getDateRange(period: string): DateFilter {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  switch (period) {
    case "this-month": {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };
    }
    case "last-3-months": {
      const startDate = new Date(year, month - 2, 1);
      const endDate = new Date(year, month + 1, 0);
      return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };
    }
    case "this-year": {
      return {
        startDate: `${year}-01-01`,
        endDate: `${year}-12-31`,
      };
    }
    default:
      return { startDate: "", endDate: "" };
  }
}

export default function RefundsDateFilter({ onFilterChange }: RefundsDateFilterProps) {
  const [period, setPeriod] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  useEffect(() => {
    if (period === "custom") {
      onFilterChange({ startDate: customStartDate, endDate: customEndDate });
    } else {
      const dateRange = getDateRange(period);
      onFilterChange(dateRange);
    }
  }, [period, customStartDate, customEndDate, onFilterChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-end w-full sm:w-auto">
      <div className="w-full sm:w-44">
        <SelectField
          label="Período"
          options={periodOptions}
          value={period}
          onValueChange={setPeriod}
        />
      </div>

      {period === "custom" && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-36">
            <InputText
              label="De"
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-36">
            <InputText
              label="Até"
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
