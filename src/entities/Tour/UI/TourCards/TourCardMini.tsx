import React from 'react'
import { TourType } from '../../model/type'
import { ImageWithFallback } from '../../../../shared/ui/ImageWithFallback'
import { MapPin, Clock, Star } from 'lucide-react'
import { optimizeImageUrl } from '../../../../shared/utils/imageRenderingOptimizator'

export default function TourCardMini({ tour }: { tour: TourType }) {
  const optimizedImageUrl = optimizeImageUrl(tour.image_url, 400, 90);
  
  return (
    <div className="relative flex gap-4 p-4 overflow-hidden transition-all duration-300 bg-white border border-gray-200 cursor-pointer group rounded-xl hover:shadow-xl hover:border-blue-300 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-blue-700">
      {tour.is_active && (
        <div className="absolute z-10 px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full top-2 right-2">
          Активен
        </div>
      )}

      <div className="relative flex-shrink-0 w-40 overflow-hidden bg-gray-100 rounded-lg h-28 dark:bg-gray-800">
        <ImageWithFallback
          src={optimizedImageUrl}
          alt={tour.title}
          className="object-cover w-full h-full antialiased transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"></div>
        
        {tour.rating > 0 && (
          <div className="absolute flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white rounded-full bottom-2 left-2 bg-black/60 backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {tour.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="mb-1 text-base font-semibold text-gray-900 transition-colors line-clamp-1 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {tour.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{tour.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{tour.duration}</span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-500">от</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${tour.price}
            </p>
          </div>
          
          {tour.capacity > 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-500">
              до {tour.capacity} чел.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}