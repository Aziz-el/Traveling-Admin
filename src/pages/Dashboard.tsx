
import { StatsCard } from '../shared/components/StatsCard';
import { InteractiveMap } from '../shared/components/InteractiveMap';
import { MapPin, Users, DollarSign, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { formatDateRange } from '../shared/utils/formatDate';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import TourCardMini from '../entities/Tour/UI/TourCards/TourCardMini';
import TourCardMid from '../entities/Tour/UI/TourCards/TourCardMid';
import { useBookingStore } from '../entities/Booking/model/useBookingStore';

interface DashboardProps {
  onMapItemClick?: (tourId: string, x: number, y: number) => void;
  onSelectTour?: (tourId: string) => void;
  selectedTourId?: string | null;
}

export function Dashboard({  onMapItemClick, onSelectTour, selectedTourId }: DashboardProps) {
  let tours = useTourStore().tours;
  const activeTours = tours.filter(t => t.is_active === true);
  const totalRevenue = tours.reduce((sum, tour) => sum + tour.price, 0);
  const avgPrice = tours.length > 0 ? totalRevenue / tours.length : 0; 
  const bookings =useBookingStore().bookings;

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="mb-2 text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Обзор активности туристического сервиса</p>
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

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              {activeTours.slice(0, 5).map((tour) => (
                <TourCardMini key={tour.id} tour={tour} onSelectTour={onSelectTour}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
        <h2 className="mb-4 text-gray-900 dark:text-white">Последние туры</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tours.slice(0, 8).map((tour) => (
            <TourCardMid key={tour.id} tour={tour} onSelectTour={onSelectTour} />
          ))}
        </div>
      </div>
    </div>
  );
}
