import React from 'react';

export default function TourCardMiniSkeleton() {
  return (
    <div className="relative flex flex-col gap-3 p-3 bg-white border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-800 sm:flex-row sm:gap-4 sm:p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded-lg sm:w-40 sm:h-28 dark:bg-gray-800" />

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="w-3/4 h-4 mb-2 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="w-1/2 h-3 bg-gray-200 rounded dark:bg-gray-700" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="w-1/3 h-3 bg-gray-200 rounded dark:bg-gray-700" />
          </div>
        </div>

        <div className="mt-3">
          <div className="w-8 h-3 mb-1 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="w-16 h-5 bg-gray-200 rounded dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
