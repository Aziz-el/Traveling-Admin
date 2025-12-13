import React from 'react';

export default function UsersSkeleton() {
  return (
    <div className="p-8 h-screen dark:bg-gray-950">
      <div className="mb-8">
        <div className="w-48 h-6 bg-gray-300 rounded dark:bg-gray-700 animate-pulse" />
        <div className="w-64 h-4 bg-gray-300 rounded dark:bg-gray-700 mt-2 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 animate-pulse">
            <div className="h-6 mb-4 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-700" />
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="h-6 w-48 bg-gray-300 rounded dark:bg-gray-700 animate-pulse" />
        </div>

        <div className="overflow-x-auto p-6">
          <div className="w-full">
            {Array.from({ length: 6 }).map((_, r) => (
              <div key={r} className="flex items-center gap-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="w-12 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="w-1/4 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="w-1/4 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="w-1/4 h-4 bg-gray-300 rounded dark:bg-gray-700" />
                <div className="w-1/4 h-4 bg-gray-300 rounded dark:bg-gray-700 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
