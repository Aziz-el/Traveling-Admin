import React from 'react'
import { TourType } from '../../model/type'
import { ImageWithFallback } from '../../../../shared/ui/ImageWithFallback'
import { MapPin, Clock, Star, Users } from 'lucide-react'
import { optimizeImageUrl } from '../../../../shared/utils/imageRenderingOptimizator'
import { useNavigate } from 'react-router'

export default function TourCardMid({tour,onSelectTour}: {tour: TourType, onSelectTour?: (id: string) => void }) {
  const optimizedImageUrl = optimizeImageUrl(tour.image_url, 600, 90);
  let navigate = useNavigate();
  return (
    <div className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-xl group hover:shadow-2xl hover:border-blue-300 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-blue-700"
    onClick={() => { onSelectTour?.(tour?.id); navigate(`/tours/${tour?.id}`); }}>
      {tour.is_active && (
        <div className="absolute z-10 px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full top-3 right-3">
          Активен
        </div>
      )}

      <div className="relative overflow-hidden bg-gray-100 aspect-video dark:bg-gray-800">
        <ImageWithFallback
          src={optimizedImageUrl}
          alt={tour.title}
          className="object-cover w-full h-full antialiased transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-100"></div>
        
        {tour.rating > 0 && (
          <div className="absolute flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white rounded-lg bottom-3 left-3 bg-white/10 backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {tour.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors line-clamp-1 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {tour.title}
        </h3>

        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="flex-shrink-0 w-4 h-4" />
          <span className="truncate">{tour.location}</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-500">
          <Clock className="flex-shrink-0 w-4 h-4" />
          <span>{tour.duration}</span>
        </div>

        {tour.description && (
          <p className="mb-3 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
            {tour.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-500">от</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${tour.price}
            </p>
          </div>
          
          {tour.capacity > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
              <Users className="w-4 h-4" />
              {tour.capacity}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}