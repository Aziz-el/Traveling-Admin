import type { Tour } from '../Home/Home';
import { InteractiveMap } from '../../shared/ui/interactiveMap/InterActiveMap';
import { StatsCard } from '../../shared/components/StatsCard/StatsCard';
import { MapPin, Users, TrendingUp, Calendar, Building2, Globe } from 'lucide-react';
import { Badge } from '../../shared/ui/Badge/Badge';

interface DashboardProps {
  tours: Tour[];
}

export function Dashboard({ tours }: DashboardProps) {
  const activeTours = tours.filter(t => t.status === 'Активный').length;
  const totalRevenue = tours.reduce((sum, tour) => sum + tour.price, 0);
  const averageDuration = tours.length > 0 
    ? Math.round(tours.reduce((sum, tour) => sum + tour.duration, 0) / tours.length)
    : 0;

  const categoryStats = tours.reduce((acc, tour) => {
    acc[tour.category] = (acc[tour.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const companyStats = tours.reduce((acc, tour) => {
    acc[tour.company] = (acc[tour.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const topCompanies = Object.entries(companyStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <h2 className="text-slate-900 text-[20px] font-bold">Обзор</h2>
        <p className="text-slate-600 mt-1">Общая статистика и активные маршруты</p>
      </header>

      <div className="flex-1 p-8 overflow-auto bg-slate-50">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Активные туры"
            value={activeTours.toString()}
            icon={MapPin}
            trend="+12%"
            color="blue"
          />
          <StatsCard
            title="Новые бронирования"
            value="24"
            icon={Calendar}
            trend="+8%"
            color="green"
          />
          <StatsCard
            title="Всего пользователей"
            value="1,432"
            icon={Users}
            trend="+23%"
            color="purple"
          />
          <StatsCard
            title="Доход"
            value={`${(totalRevenue / 1000).toFixed(0)}K ₽`}
            icon={TrendingUp}
            trend="+15%"
            color="orange"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-slate-900 ">Топ категории</h3>
                <p className="text-slate-600">Популярные направления</p>
              </div>
            </div>
            <div className="space-y-3">
              {topCategories.map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {category}
                  </Badge>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(count / tours.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-slate-700 text-slate-300 min-w-[3ch]">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-slate-900">Топ компании</h3>
                <p className="text-slate-600">Лидеры по количеству туров</p>
              </div>
            </div>
            <div className="space-y-3">
              {topCompanies.map(([company, count]) => (
                <div key={company} className="flex items-center justify-between">
                  <span className="text-slate-900 ">{company}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${(count / tours.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-slate-700 min-w-[3ch]">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4">
            <h3 className="text-slate-900">Карта маршрутов</h3>
            <p className="text-slate-600 mt-1">Визуализация активных туристических маршрутов</p>
          </div>
          <div className="h-[600px]">
            <InteractiveMap tours={tours} />
          </div>
        </div>
      </div>
    </div>
  );
}