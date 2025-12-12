import React, { useState } from 'react'
import { TourProps, TourType } from '../../model/type'
import { ImageWithFallback } from '../../../../shared/ui/ImageWithFallback';
import { Link, useNavigate } from 'react-router';
import { Clock, DollarSign, Edit, MapPin, Star, Trash2, Users } from 'lucide-react';
import { useTourStore } from '../../model/useTourStore';


export default function TourCardFull({ tour,setFormData,setEditingTour,  onSelectTour, selectedTourId }: TourProps&{setFormData?:React.Dispatch<React.SetStateAction<TourType | null>>,setEditingTour?:React.Dispatch<React.SetStateAction<TourType | null>>}) {
    const navigate = useNavigate();
    let tourStore = useTourStore();
    let onDeleteTour = tourStore.deleteTour;
    const handleEdit = (tour: TourType  ) => {
               setEditingTour?.(tour);
               setFormData?.(tour);
             };

      const handleDelete = (id: string, name: string) => {
        if (window.confirm(`Вы уверены, что хотите удалить тур "${name}"?`)) {
          onDeleteTour(id);
        }
      };
    
     
    if(tour===undefined){
        return <div>Tour not found</div>
    }
  return (
    <div 
  key={tour?.id} 
  onClick={() => { onSelectTour?.(tour?.id); navigate(`/tours/${tour?.id}`); }}
  className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer 
    ${selectedTourId === tour?.id 
      ? 'border-blue-600 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-900' 
      : 'border-gray-200 dark:border-gray-800'
    }`}
>
  <div className="relative overflow-hidden aspect-video">
    <ImageWithFallback
      src={tour?.image_url}
      alt={tour?.title}
      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
    />

    <div className="absolute flex gap-2 top-3 right-3">
      <span
        className={`px-3 py-1 rounded-full backdrop-blur-sm ${
          tour?.is_active 
            ? 'bg-green-500/90 text-white' 
            : 'bg-gray-500/90 text-white'
        }`}
      >
        {tour?.is_active ? "Активный" : "Неактивный"}
      </span>
    </div>
  </div>

  <div className="p-5">
    <div className="mb-3">
      <h3 className="mb-1 text-gray-900 truncate dark:text-white">{tour?.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 h-25">
        {tour?.description}
      </p>
    </div>

    <div className="pb-4 mb-4 space-y-2 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <MapPin className="flex-shrink-0 w-4 h-4" />
        <span className="truncate">{tour?.location}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span>{tour?.duration}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Users className="w-4 h-4" />
        <span>Вместимость: {tour?.capacity}</span>
      </div>

      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-gray-900 dark:text-white">${tour?.price}</span>
      </div>

      <div className="flex items-center gap-2 text-yellow-500">
        <Star className="w-4 h-4" />
        <span>{tour?.rating}</span>
      </div>
    </div>

    <div className="flex gap-2">
      <Link to={`/edit-tour/${tour?.id}`} className="flex-1">
      <button
        onClick={(e) => { e.stopPropagation(); }}
        className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Edit className="w-4 h-4" />
        Изменить
      </button>
      </Link>

      <button
        onClick={(e) => { e.stopPropagation(); handleDelete(tour?.id, tour?.title); setTimeout(() => {tourStore.fetchTours()}, 3000); }}
        className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-red-600 transition-colors rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
      >
        <Trash2 className="w-4 h-4" />
        Удалить
      </button>
    </div>
  </div>
</div>

  )
}
