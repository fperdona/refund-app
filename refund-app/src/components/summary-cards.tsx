import { useRefundStats } from "../hooks/use-refund-stats";
import Text from "../core-components/text";

function formatCurrency(valueInCents: number): string {
  return (valueInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function SummaryCardSkeleton() {
  return (
    <div className="bg-gray-500 rounded-xl p-4 animate-pulse">
      <div className="h-4 bg-gray-400 rounded w-24 mb-2" />
      <div className="h-6 bg-gray-400 rounded w-32 mb-1" />
      <div className="h-3 bg-gray-400 rounded w-16" />
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  count: number;
  selected?: boolean;
  onClick?: () => void;
}

function SummaryCard({ label, value, count, selected, onClick }: SummaryCardProps) {
  return (
    <div
      className={`rounded-xl p-4 cursor-pointer transition-colors ${selected ? "bg-green-100" : "bg-gray-500 hover:bg-gray-400"
        }`}
      onClick={onClick}
    >
      <Text className={`text-sm block mb-1 ${selected ? "text-white" : "text-gray-100"}`}>{label}</Text>
      <Text className={`text-lg font-bold block ${selected ? "text-white" : "text-gray-100"}`}>{value}</Text>
      <Text className={`text-xs block ${selected ? "text-white" : "text-gray-200"}`}>
        {count} {count === 1 ? "solicitação" : "solicitações"}
      </Text>
    </div>
  );
}

interface SummaryCardsProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function SummaryCards({ selectedCategory, onCategoryChange }: SummaryCardsProps) {
  const { data, isLoading } = useRefundStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const handleCardClick = (category: string | null) => {
    if (selectedCategory === category) {
      onCategoryChange(null);
    } else {
      onCategoryChange(category);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <SummaryCard
        label="Total"
        value={formatCurrency(data.totalValue)}
        count={data.totalCount}
        selected={selectedCategory === null}
        onClick={() => handleCardClick(null)}
      />
      {data.byCategory.map((cat) => (
        <SummaryCard
          key={cat.category}
          label={cat.label}
          value={formatCurrency(cat.total)}
          count={cat.count}
          selected={selectedCategory === cat.category}
          onClick={() => handleCardClick(cat.category)}
        />
      ))}
    </div>
  );
}
