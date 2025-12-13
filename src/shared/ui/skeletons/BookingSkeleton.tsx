import React from 'react';

export default function BookingSkeleton() {
  return (
    <div className="flex gap-4 p-4 transition-all border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-xl animate-pulse">
      <div className="flex-shrink-0 w-24 h-24 bg-gray-300 rounded-lg dark:bg-gray-700" />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="w-1/3 h-5 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-16 h-5 bg-gray-300 rounded dark:bg-gray-700" />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="w-20 h-5 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-20 h-5 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-28 h-5 bg-gray-300 rounded dark:bg-gray-700" />
        </div>

        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <div className="w-24 h-4 bg-gray-300 rounded dark:bg-gray-700" />
          <span className="w-2 h-4 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-20 h-4 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="w-32 h-4 bg-gray-300 rounded dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
