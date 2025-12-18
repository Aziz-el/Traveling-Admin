import React, { useEffect, useState } from 'react';
import { TourProps, TourType } from '../entities/Tour/model/type';
import TourCardFull from '../entities/Tour/UI/TourCards/TourCardFull';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import TourCardSkeleton from '../entities/Tour/UI/TourSkeletons/TourCardSkeleton';
import { useDebounce } from '../shared/hooks/useDebounce';
import CustomInput from '../shared/ui/input';
import { useCustomSearchParams } from '../shared/hooks/useCustomSearchParams';
export function ToursList({  onSelectTour, selectedTourId }: TourProps) {
  let toursStore = useTourStore()
  let tours = toursStore.tours;
  let loading = useTourStore().loading;
  let {update} = useCustomSearchParams()
   let [search,setSerch] = useState("")

  
  const debouncedQuery = useDebounce(search, 800); 
  useEffect(() => {
    update("search",debouncedQuery)

    toursStore.fetchTours({search:debouncedQuery});
  }, [debouncedQuery]);
  
  const [editingTour, setEditingTour] = useState<TourType | null>(null);
  const [formData, setFormData] = useState<TourType | null>(null);



  return (
    <div className="h-full p-8 dark:bg-gray-950">
      <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-center sm:justify-between max-md:mt-5">
  <div>
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
      Туры
    </h1>
    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
      Управление всеми турами
    </p>
  </div>

  <div>
     <CustomInput value={search} name='search' onChange={(e)=> setSerch(e.target.value)} placeholder='Поиск' />
  </div>
</div>

      
      {
        loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => <TourCardSkeleton  key={index}/>)}
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
