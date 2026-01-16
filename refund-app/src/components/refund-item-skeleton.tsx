export default function RefundItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-400 rounded-full" />
        <div>
          <div className="h-4 w-24 bg-gray-400 rounded mb-2" />
          <div className="h-3 w-16 bg-gray-400 rounded" />
        </div>
      </div>
      <div className="h-4 w-20 bg-gray-400 rounded" />
    </div>
  );
}
