import React, { useEffect, useState } from 'react';
import { TourProps, TourType } from '../entities/Tour/model/type';
import TourCardFull from '../entities/Tour/UI/TourCards/TourCardFull';
import FormModal from '../entities/Tour/UI/FormModals/FormModal';
import { useTourStore } from '../entities/Tour/model/useTourStore';


export function ToursList({   categoryImages, onSelectTour, selectedTourId }: TourProps) {
  const toursStore = useTourStore();
  const tours = toursStore.tours;
  useEffect(() => {
    toursStore.fetchTours();
  }, []);

  const { updateTour: onUpdateTour, deleteTour: onDeleteTour } = useTourStore();
  
  const [editingTour, setEditingTour] = useState<TourType | null>(null);
  const [formData, setFormData] = useState<TourType | null>(null);
  const handleUpdate = (e: React.FormEvent) => {
          e.preventDefault();
          if (formData && editingTour) {
            onUpdateTour(editingTour?.id, formData);
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tours.map((tour) => (
          <TourCardFull tour={tour}  key={tour.id} setFormData={setFormData} setEditingTour={setEditingTour}  categoryImages={categoryImages} onSelectTour={onSelectTour} selectedTourId={selectedTourId} />
        ))}
      </div>

      {editingTour && formData && (
        <FormModal
          editingTour={editingTour}
          setEditingTour={setEditingTour}
          formData={formData}
          setFormData={setFormData}
          handleUpdate={handleUpdate}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
}
