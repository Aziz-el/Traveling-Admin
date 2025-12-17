import React from 'react';

export default function BookingDetailsSkeleton() {
  return (
    <div className="min-h-[697px] p-6">
      <div className="animate-pulse">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 space-y-4">
            <div className="w-full h-48 rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="h-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="h-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
          </div>
          <aside className="w-full lg:w-1/3 space-y-4">
            <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="h-8 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-8 rounded bg-gray-200 dark:bg-gray-800" />
          </aside>
        </div>
      </div>
    </div>
  );
}
