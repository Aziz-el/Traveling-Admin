import React from 'react'
import { TourType } from '../../model/type'
import { ImageWithFallback } from '../../../../shared/ui/ImageWithFallback'
import { MapPin, Clock, Star } from 'lucide-react'
import { optimizeImageUrl } from '../../../../shared/utils/imageRenderingOptimizator'
import { useNavigate } from 'react-router'

export default function TourCardMini({ tour,onSelectTour }: { tour: TourType, onSelectTour?: (id: string) => void }) {
  const optimizedImageUrl = optimizeImageUrl(tour.image_url, 400, 90)
  let navigate = useNavigate();
  return (
    <div className="relative flex flex-col gap-3 p-3 overflow-hidden transition-all duration-300 bg-white border border-gray-200 cursor-pointer group rounded-xl hover:shadow-xl hover:border-blue-300 sm:flex-row sm:gap-4 sm:p-4 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-blue-700"
    onClick={() => { onSelectTour?.(tour?.id); navigate(`/tours/${tour?.id}`); }}>
      <div className="relative w-full h-40 overflow-hidden bg-gray-100 rounded-lg sm:w-40 sm:h-28 dark:bg-gray-800">
        <ImageWithFallback
          src={optimizedImageUrl}
          alt={tour.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/30 to-transparent group-hover:opacity-100" />

        {tour.rating > 0 && (
          <div className="absolute flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white rounded-full bottom-2 left-2 bg-white/10 backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {tour.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="mb-1 text-base font-semibold text-gray-900 transition-colors line-clamp-2 sm:line-clamp-1 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {tour.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-1 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{tour.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{tour.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-xs text-gray-500">от</p>
            <p className="text-lg font-bold text-blue-600 sm:text-xl dark:text-blue-400">
              ${tour.price}
            </p>
          </div>

    
        </div>
      </div>
    </div>
  )
}
