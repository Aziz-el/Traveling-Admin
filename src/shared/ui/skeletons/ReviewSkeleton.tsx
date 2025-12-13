import React from 'react';
import RatingSkeleton from './RatingSkeleton';

export default function ReviewSkeleton() {
  return (
    <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50 animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="w-48 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
              <div className="w-32 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <RatingSkeleton />
            <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
          <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}
