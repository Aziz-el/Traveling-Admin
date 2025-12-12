import React from 'react'
import { TourType } from '../../model/type'
import { ImageWithFallback } from '../../../../shared/ui/ImageWithFallback'

export default function TourCardMini({ tour }: { tour: TourType }) {
  return (
    <div key={tour.id} className="flex gap-4 p-3 overflow-hidden transition-shadow bg-white border border-gray-200 cursor-pointer rounded-xl hover:shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
        <ImageWithFallback
          src={tour.image_url}
          alt={tour.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-gray-900 truncate transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {tour.title}
        </h3>

        <p className="text-gray-600 truncate dark:text-gray-400">
          {tour.location}
        </p>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {tour.duration}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-900 dark:text-white">
            ${tour.price}
          </span>
        </div>
      </div>
    </div>
  )
}
