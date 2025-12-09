import { Tour } from '../app/App';
import { StatsCard } from '../shared/components/StatsCard';
import { InteractiveMap } from '../shared/components/InteractiveMap';
import { MapPin, Users, DollarSign, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { formatDateRange } from '../shared/utils/formatDate';

interface DashboardProps {
  tours: Tour[];
  onMapItemClick?: (tourId: string, x: number, y: number) => void;
  onSelectTour?: (tourId: string) => void;
}

export function Dashboard({ tours, onMapItemClick, onSelectTour }: DashboardProps) {
  const activeTours = tours.filter(t => t.status === 'Активный');
  const totalRevenue = tours.reduce((sum, tour) => sum + tour.price, 0);
  const avgPrice = tours.length > 0 ? totalRevenue / tours.length : 0;

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Обзор активности туристического сервиса</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Активные туры"
          value={activeTours.length}
          icon={MapPin}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Новые бронирования"
          value={23}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-gray-900 dark:text-white">Карта маршрутов</h2>
            <p className="text-gray-600 dark:text-gray-400">Все активные туры на карте</p>
          </div>
          <div className="h-[600px]">
            <InteractiveMap tours={activeTours} onMapItemClick={onMapItemClick} onSelectTour={onSelectTour} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-gray-900 dark:text-white">Популярные туры</h2>
            <p className="text-gray-600 dark:text-gray-400">Топ направлений</p>
          </div>
          <div className="p-6 space-y-4">
            {activeTours.slice(0, 5).map((tour) => (
              <div key={tour.id} className="flex gap-4 group cursor-pointer">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 truncate">{tour.company}</p>
                    { (tour.startTime || tour.endTime) && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDateRange(tour.startTime, tour.endTime)}</p>
                    ) }
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      {tour.category}
                    </span>
                    <span className="text-gray-900 dark:text-white">${tour.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-gray-900 dark:text-white mb-4">Последние туры</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.slice(0, 8).map((tour) => (
            <div key={tour.id} className="group cursor-pointer border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md  transition-shadow">
              <div className="aspect-video rounded-lg overflow-hidden mb-3">
                <ImageWithFallback
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tour.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 truncate mb-2">{tour.company}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  {tour.category}
                </span>
                <span className="text-gray-900 dark:text-white">${tour.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
