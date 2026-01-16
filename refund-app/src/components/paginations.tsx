import CaretLeft from "../assets/icons/caret-left.svg?react";
import CaretRight from "../assets/icons/caret-right.svg?react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < lastPage;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100 hover:bg-green-200 disabled:opacity-30 disabled:pointer-events-none"
      >
        <CaretLeft className="w-5 h-5 fill-white" />
      </button>
      <span className="text-gray-200 mx-2">
        {currentPage}/{lastPage}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100 hover:bg-green-200 disabled:opacity-30 disabled:pointer-events-none"
      >
        <CaretRight className="w-5 h-5 fill-white" />
      </button>
    </div>
  );
}
