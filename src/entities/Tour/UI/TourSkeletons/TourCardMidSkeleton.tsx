import React from 'react';

export default function TourCardMidSkeleton() {
  return (
    <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-800 animate-pulse">
      <div className="absolute z-10 w-20 h-6 bg-gray-200 rounded-full top-3 right-3 dark:bg-gray-700" />

      <div className="relative bg-gray-100 aspect-video dark:bg-gray-800" />

      <div className="p-4">
        <div className="w-3/4 h-5 mb-3 bg-gray-200 rounded dark:bg-gray-700" />

        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="w-1/3 h-4 bg-gray-200 rounded dark:bg-gray-700" />
        </div>

        <div className="space-y-2 mb-3">
          <div className="w-full h-4 bg-gray-200 rounded dark:bg-gray-700" />
          <div className="w-5/6 h-4 bg-gray-200 rounded dark:bg-gray-700" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
          <div>
            <div className="w-10 h-3 mb-1 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="w-16 h-6 bg-gray-200 rounded dark:bg-gray-700" />
          </div>

          <div className="w-14 h-8 bg-gray-200 rounded-lg dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
