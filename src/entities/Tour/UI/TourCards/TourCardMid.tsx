import React from 'react'
import { TourType } from '../../model/type'
import { ImageWithFallback } from '../../../../shared/ui/ImageWithFallback'

export default function TourCardMid({tour}: {tour: TourType}) {
  return (
    <div key={tour.id} className="p-4 transition-shadow border border-gray-200 rounded-lg cursor-pointer group dark:border-gray-800 hover:shadow-md">
                  <div className="mb-3 overflow-hidden rounded-lg aspect-video">
                    <ImageWithFallback
                      src={tour.image_url}
                      alt={tour.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-gray-900 truncate transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {tour.title}
                  </h3>
                  <p className="mb-2 text-gray-600 truncate dark:text-gray-400">{tour.company_id}</p>
                  <div className="flex items-center justify-between">
                    
                    <span className="text-gray-900 dark:text-white">${tour.price}</span>
                  </div>
                </div>
  )
}
