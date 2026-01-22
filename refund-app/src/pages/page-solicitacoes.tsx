import { useQueryState } from "nuqs";
import { useState, useCallback, useMemo } from "react";
import { useRefunds } from "../hooks/use-refunds";
import { useRefundStats } from "../hooks/use-refund-stats";
import RefundItem from "../components/refund-item";
import Pagination from "../components/paginations";
import RefundsSearch from "../components/refunds-search";
import RefundsDateFilter from "../components/refunds-date-filter";
import RefundItemSkeleton from "../components/refund-item-skeleton";
import SummaryCards from "../components/summary-cards";

interface DateFilter {
  startDate: string;
  endDate: string;
}

export default function Solicitacoes() {
  const [search] = useQueryState("q", { defaultValue: "" });
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<DateFilter>({ startDate: "", endDate: "" });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data, isLoading } = useRefunds(page, search, dateFilter);
  const { data: statsData, isLoading: isLoadingStats } = useRefundStats();

  const handleDateFilterChange = useCallback((filter: DateFilter) => {
    setDateFilter(filter);
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setPage(1);
  }, []);

  const filteredData = useMemo(() => {
    let result;

    if (!selectedCategory) {
      result = data?.data ?? [];
    } else {
      if (!statsData) return [];

      result = statsData.refunds.filter((refund) => {
        const matchesCategory = refund.category === selectedCategory;
        const matchesSearch = !search || refund.title.toLowerCase().includes(search.toLowerCase());
        const matchesStartDate = !dateFilter.startDate || (refund.date && refund.date >= dateFilter.startDate);
        const matchesEndDate = !dateFilter.endDate || (refund.date && refund.date <= dateFilter.endDate);

        return matchesCategory && matchesSearch && matchesStartDate && matchesEndDate;
      });
    }

    return [...result].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });
  }, [selectedCategory, data, statsData, search, dateFilter]);

  const showPagination = !selectedCategory && data && data.data.length > 0;
  const isLoadingData = selectedCategory ? isLoadingStats : isLoading;

  return (
    <div className="bg-white rounded-2xl p-8">
      <h1 className="text-xl font-bold text-gray-200 mb-6">Solicitações</h1>

      <SummaryCards selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

      <div className="flex flex-col md:flex-row gap-4 md:items-end mb-6">
        <RefundsDateFilter onFilterChange={handleDateFilterChange} />
        <RefundsSearch />
      </div>
      {/* Loading */}
      {isLoadingData && (
        <div className="border-t border-gray-400 pt-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <RefundItemSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoadingData && filteredData.length === 0 && (
        <div className="text-gray-200 flex justify-center border-t border-gray-400 py-5">
          Nenhuma solicitação encontrada.
        </div>
      )}

      {!isLoadingData && filteredData.length > 0 && (
        <>
          <div className="border-t border-gray-400 pt-5">
            {filteredData.map((refund) => (
              <RefundItem
                key={refund.id}
                id={refund.id}
                title={refund.title}
                category={refund.category}
                value={refund.value}
                date={refund.date}
              />
            ))}
          </div>

          {showPagination && (
            <Pagination
              currentPage={data!.meta.currentPage}
              lastPage={data!.meta.lastPage}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
