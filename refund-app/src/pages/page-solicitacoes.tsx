import { useQueryState } from "nuqs";
import { useState } from "react";
import { useRefunds } from "../hooks/use-refunds";
import RefundItem from "../components/refund-item";
import Pagination from "../components/paginations";
import RefundsSearch from "../components/refunds-search";
import RefundItemSkeleton from "../components/refund-item-skeleton";

export default function Solicitacoes() {
  const [search] = useQueryState("q", { defaultValue: "" });
  const [page, setPage] = useState(1);
  const { data, isLoading } = useRefunds(page, search);

  return (
    <div className="bg-white rounded-2xl p-8">
      <h1 className="text-xl font-bold text-gray-200 mb-6">Solicitações</h1>

      <RefundsSearch />
      {/* Loading */}
      {isLoading && (
        <div className="border-t border-gray-400 pt-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <RefundItemSkeleton key={i} />
          ))}
        </div>
      )}

      {data && data.data.length === 0 && (
        <div className="text-gray-200 flex justify-center border-t border-gray-400 py-5">
          Nenhuma solicitação encontrada.
        </div>
      )}

      {data && data.data.length > 0 && (
        <>
          <div className="border-t border-gray-400 pt-5">
            {data.data.map((refund) => (
              <RefundItem
                key={refund.id}
                id={refund.id}
                title={refund.title}
                category={refund.category}
                value={refund.value}
              />

            ))}
          </div>

          <Pagination
            currentPage={data.meta.currentPage}
            lastPage={data.meta.lastPage}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
