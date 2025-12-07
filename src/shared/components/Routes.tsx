import { Route, MapPin, Navigation } from 'lucide-react';

export function Routes() {
  const routes = [
    { id: 1, name: 'Азия - Круговой маршрут', points: 5, distance: '8,450 км', status: 'Активный' },
    { id: 2, name: 'Европа - Классический тур', points: 7, distance: '5,200 км', status: 'Активный' },
    { id: 3, name: 'Америка - Транс-континентальный', points: 10, distance: '12,800 км', status: 'Активный' },
    { id: 4, name: 'Африка - Сафари маршрут', points: 4, distance: '3,100 км', status: 'Неактивный' },
    { id: 5, name: 'Океания - Островной тур', points: 6, distance: '4,700 км', status: 'Активный' },
  ];

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Маршруты</h1>
        <p className="text-gray-600 dark:text-gray-400">Популярные туристические маршруты</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <Route className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+8%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 mb-1">Всего маршрутов</h3>
          <p className="text-gray-900 dark:text-white">{routes.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+12%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 mb-1">Активные</h3>
          <p className="text-gray-900 dark:text-white">{routes.filter(r => r.status === 'Активный').length}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <Navigation className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+5%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 mb-1">Общая дистанция</h3>
          <p className="text-gray-900 dark:text-white">34,250 км</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-gray-900 dark:text-white">Все маршруты</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">ID</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Название</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Точек</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Дистанция</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {routes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-gray-900 dark:text-white">#{route.id}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{route.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {route.points}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{route.distance}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full ${
                      route.status === 'Активный'
                        ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}>
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
