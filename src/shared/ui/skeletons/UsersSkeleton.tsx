
export default function UsersSkeleton() {
  return (
    <div className="p-6 min-h-[40vh] dark:bg-gray-950">
      <div className="mb-6">
        <div className="w-full max-w-lg h-6 bg-gray-300 rounded dark:bg-gray-700 animate-pulse" />
        <div className="w-full max-w-xl h-4 bg-gray-300 rounded dark:bg-gray-700 mt-2 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 animate-pulse">
            <div className="h-6 mb-4 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-700" />
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="h-6 w-full max-w-xs bg-gray-300 rounded dark:bg-gray-700 animate-pulse" />
        </div>

        {/* Mobile: card list skeleton */}
        <div className="md:hidden p-4 space-y-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg animate-pulse">
              <div className="h-4 w-2/3 bg-gray-300 rounded mb-2 dark:bg-gray-700" />
              <div className="h-3 w-3/4 bg-gray-300 rounded mb-2 dark:bg-gray-700" />
              <div className="h-3 w-1/2 bg-gray-300 rounded dark:bg-gray-700" />
            </div>
          ))}
        </div>

        {/* Desktop: table skeleton */}
        <div className="hidden md:block overflow-x-auto p-6">
          <div className="w-full">
            {Array.from({ length: 6 }).map((_, r) => (
              <div key={r} className="grid grid-cols-6 gap-4 items-center py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="col-span-1 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="col-span-2 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="col-span-1 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="col-span-1 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="col-span-1 ml-auto h-4 bg-gray-300 rounded dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
