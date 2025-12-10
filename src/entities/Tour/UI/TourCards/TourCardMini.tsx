import React from 'react'
import { Tour } from '../../../../app/App'
import { TourType } from '../../model/type'
import { ImageWithFallback } from '../../../../shared/ui/ImageWithFallback'

export default function TourCardMini({tour,formatDateRange}:{tour: Tour, formatDateRange: (start: string | undefined, end: string | undefined) => string}) {
  return (
    <div key={tour.id} className="flex gap-4 cursor-pointer group">
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={tour.image}
                        alt={tour.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 truncate transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {tour.name}
                      </h3>
                      <p className="text-gray-600 truncate dark:text-gray-400">{tour.company}</p>
                        { (tour.startTime || tour.endTime) && (
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatDateRange(tour.startTime, tour.endTime)}</p>
                        ) }
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                          {tour.category}
                        </span>
                        <span className="text-gray-900 dark:text-white">${tour.price}</span>
                      </div>
                    </div>
      </div>
  )
}
