import { Tour } from '../../app/App';
import { Building2, MapPin, DollarSign, TrendingUp } from 'lucide-react';

interface CompaniesProps {
  tours: Tour[];
}

export function Companies({ tours }: CompaniesProps) {
  const companies = ['GitLens Travel', 'Aviasales Tours'];

  const getCompanyStats = (companyName: string) => {
    const companyTours = tours.filter(t => t.company === companyName);
    const activeTours = companyTours.filter(t => t.status === 'Активный');
    const totalRevenue = companyTours.reduce((sum, t) => sum + t.price, 0);
    const avgPrice = companyTours.length > 0 ? totalRevenue / companyTours.length : 0;

    return {
      total: companyTours.length,
      active: activeTours.length,
      revenue: totalRevenue,
      avgPrice: avgPrice,
      tours: companyTours,
    };
  };

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Компании</h1>
        <p className="text-gray-600 dark:text-gray-400">Туроператоры и их статистика</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {companies.map((company) => {
          const stats = getCompanyStats(company);
          
          return (
            <div key={company} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                    <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-gray-900 dark:text-white">{company}</h2>
                    <p className="text-gray-600 dark:text-gray-400">Туроператор</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-600 dark:text-gray-400">Всего туров</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">{stats.total}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-gray-600 dark:text-gray-400">Активных</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">{stats.active}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-600 dark:text-gray-400">Выручка</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">${stats.revenue.toLocaleString()}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-gray-600 dark:text-gray-400">Средняя цена</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">${Math.round(stats.avgPrice)}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <h3 className="text-gray-900 dark:text-white mb-3">Туры компании</h3>
                  <div className="space-y-2">
                    {stats.tours.map((tour) => (
                      <div 
                        key={tour.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 dark:text-white truncate">{tour.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                              {tour.category}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${
                              tour.status === 'Активный'
                                ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                                : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}>
                              {tour.status}
                            </span>
                          </div>
                        </div>
                        <span className="text-gray-900 dark:text-white ml-4">${tour.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
