import RatingSkeleton from './RatingSkeleton';

export default function ReviewSkeleton() {
  return (
    <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50 animate-pulse">
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0" />
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div className="w-full sm:w-auto">
              <div className="w-full sm:w-48 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
              <div className="w-full sm:w-32 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
            <div className="w-full sm:w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded mt-3 sm:mt-0" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
            <RatingSkeleton />
            <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <div className="w-full sm:w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <div className="w-full sm:w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}
