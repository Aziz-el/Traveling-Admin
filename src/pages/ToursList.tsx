import React, { useEffect, useState } from 'react';
import { TourProps, TourType } from '../entities/Tour/model/type';
import TourCardFull from '../entities/Tour/UI/TourCards/TourCardFull';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import TourCardSkeleton from '../entities/Tour/UI/TourCards/TourCardSkeleton';


export function ToursList({  onSelectTour, selectedTourId }: TourProps) {
  let toursStore = useTourStore()
  let tours = toursStore.tours;
  let loading = useTourStore().loading;
  useEffect(() => {
    toursStore.fetchTours();
  }, []);
  
  let onUpdateTour = useTourStore().updateTour;
  let onDeleteTour = useTourStore().deleteTour;
  
  const [editingTour, setEditingTour] = useState<TourType | null>(null);
  const [formData, setFormData] = useState<TourType | null>(null);
  const handleUpdate = () => {
          if (formData && editingTour) {
            onUpdateTour(editingTour?.id,formData);
            setEditingTour(null);
            setFormData(null);
          }
        };
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          if (formData && setFormData) {
            setFormData({
              ...formData,
              [name]: name === 'price' || name.includes('Lat') || name.includes('Lng') 
                ? parseFloat(value) || 0 
                : value,
            });
          }
        };
  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="mb-2 text-gray-900 dark:text-white">Туры</h1>
        <p className="text-gray-600 dark:text-gray-400">Управление всеми турами</p>
      </div>

      
      {
        loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => <TourCardSkeleton />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tours.map((tour) => (
          <TourCardFull tour={tour}  key={tour.id} setFormData={setFormData} setEditingTour={setEditingTour} onSelectTour={onSelectTour} selectedTourId={selectedTourId} />
        ))}
      </div>
        )
      }
    </div>
  );
}
