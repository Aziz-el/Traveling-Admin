
import { StatsCard } from '../shared/components/StatsCard';
import { InteractiveMap } from '../shared/components/InteractiveMap';
import { MapPin, Users, DollarSign, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { formatDateRange } from '../shared/utils/formatDate';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import TourCardMini from '../entities/Tour/UI/TourCards/TourCardMini';
import TourCardMid from '../entities/Tour/UI/TourCards/TourCardMid';
import { useBookingStore } from '../entities/Booking/model/useBookingStore';
import TourCardMiniSkeleton from '../entities/Tour/UI/TourSkeletons/TourCardMiniSkeleton';
import TourCardMidSkeleton from '../entities/Tour/UI/TourSkeletons/TourCardMidSkeleton';
import { useEffect, useState } from 'react';
import { useCustomSearchParams } from '../shared/hooks/useCustomSearchParams';
import instance from '../shared/lib/axios/axios';
import { TourType } from '../entities/Tour/model/type';

interface DashboardProps {
  onMapItemClick?: (tourId: string, x: number, y: number) => void;
  onSelectTour?: (tourId: string) => void;
  selectedTourId?: string | null;
}

export function Dashboard({  onMapItemClick, onSelectTour, selectedTourId }: DashboardProps) {
  let {tours,fetchTours} = useTourStore()
  let [page,setPage] = useState(1)
  let {update} = useCustomSearchParams()
  useEffect(()=>{
    fetchTours({page:page,per_page:8})
    update("page",`${page}`)
  },[])
  const [activeTours,setActive] = useState([] as TourType[])
   instance.get("tours/",{
    params:{
      sort_by:"rating"
    }
  }).then(res=>setActive(res.data.items))
  const totalRevenue = tours.reduce((sum, tour) => sum + tour.price, 0);
  const avgPrice = tours.length > 0 ? totalRevenue / tours.length : 0; 
  const bookings =useBookingStore().bookings;

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-center sm:justify-between max-md:mt-5">
  <div>
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
      Dashboard
    </h1>
    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
      Обзор активности туристического сервиса
    </p>
  </div>
</div>


      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Активные туры"
          value={activeTours.length}
          icon={MapPin}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Новые бронирования"
          value={bookings.length}
          icon={Users}
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Общая выручка"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+15%"
          trendUp={true}
        />
        <StatsCard
          title="Средняя цена"
          value={`$${Math.round(avgPrice)}`}
          icon={TrendingUp}
          trend="-3%"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-1 2xl:grid-cols-3">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm lg:col-span-2 dark:bg-gray-900 rounded-xl dark:border-gray-800">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-gray-900 dark:text-white">Карта маршрутов</h2>
            <p className="text-gray-600 dark:text-gray-400">Все активные туры на карте</p>
          </div>
          <div className="h-[600px]">
            <InteractiveMap tours={activeTours} onMapItemClick={onMapItemClick} onSelectTour={onSelectTour} selectedTour={selectedTourId} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-gray-900 dark:text-white">Популярные туры</h2>
            <p className="text-gray-600 dark:text-gray-400">Топ направлений</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3 2xl:grid-cols-1">
              {activeTours.length == 0 ? <> {Array.from({ length: 4 }).map((_, index) => <TourCardMiniSkeleton  key={index}/>)}
              </> : <>{activeTours.slice(0, 4).map((tour) => (
                <TourCardMini key={tour.id} tour={tour} onSelectTour={onSelectTour}/>
              ))}</>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
        <h2 className="mb-4 text-gray-900 dark:text-white">Последние туры</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tours.length == 0 ? <>{Array.from({ length: 8 }).map((_, index) => <TourCardMidSkeleton  key={index}/>)}</> : <>{
            tours.slice(0, 8).map((tour) => (
            <TourCardMid key={tour.id} tour={tour} onSelectTour={onSelectTour} />
          ))}
          </>}
        </div>
      </div>
    </div>
  );
}
