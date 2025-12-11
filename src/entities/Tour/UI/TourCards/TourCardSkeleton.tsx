import React from 'react'

export default function TourCardSkeleton() {
  return (
    <div className="overflow-hidden transition-shadow bg-white border shadow-sm dark:bg-gray-900 rounded-xl group">
      <div className="relative overflow-hidden bg-gray-200 aspect-video animate-pulse">
        <div className="absolute flex gap-2 top-3 right-3">
          <span className="px-10 py-3 bg-gray-300 rounded-full dark:bg-gray-700 animate-pulse"></span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 space-y-2">
          <div className="w-2/3 h-5 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"></div>
          <div className="w-full h-4 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"></div>
        </div>

        <div className="pb-4 mb-4 space-y-3 border-b border-gray-200 dark:border-gray-800">
          <div className="w-1/2 h-4 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"></div>
          <div className="w-2/3 h-4 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"></div>
          <div className="w-1/3 h-4 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"></div>
          <div className="w-20 h-5 bg-yellow-300 rounded dark:bg-yellow-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
