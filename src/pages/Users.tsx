import { Users as UsersIcon, UserCheck, UserX, TrendingUp } from 'lucide-react';

export function Users() {
  const users = [
    { id: 1, name: 'Иван Петров', role: 'Администратор', email: 'ivan@example.com', status: 'Активный', bookings: 3, spent: 4500 },
    { id: 2, name: 'Мария Сидорова', role: 'Пользователь', email: 'maria@example.com', status: 'Активный', bookings: 1, spent: 2200 },
    { id: 3, name: 'Алексей Иванов', role: 'Компания', email: 'alexey@example.com', status: 'Активный', bookings: 2, spent: 6000 },
    { id: 4, name: 'Ольга Смирнова', role: 'Пользователь', email: 'olga@example.com', status: 'Неактивный', bookings: 0, spent: 0 },
    { id: 5, name: 'Дмитрий Козлов', role: 'Пользователь', email: 'dmitry@example.com', status: 'Активный', bookings: 1, spent: 3500 },
  ];

  const activeUsers = users.filter(u => u.status === 'Активный').length;
  const totalBookings = users.reduce((sum, u) => sum + u.bookings, 0);
  const totalSpent = users.reduce((sum, u) => sum + u.spent, 0);

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Пользователи</h1>
        <p className="text-gray-600 dark:text-gray-400">Управление клиентами</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+10%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 mb-1">Всего пользователей</h3>
          <p className="text-gray-900 dark:text-white">{users.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+5%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 mb-1">Активные</h3>
          <p className="text-gray-900 dark:text-white">{activeUsers}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+15%</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 mb-1">Общая выручка</h3>
          <p className="text-gray-900 dark:text-white">${totalSpent.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-gray-900 dark:text-white">Все пользователи</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">ID</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Имя</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Статус</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Бронирования</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Потрачено</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-gray-900 dark:text-white">#{user.id}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full ${
                      user.status === 'Активный'
                        ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}>
                      {user.status === 'Активный' ? <UserCheck className="w-4 h-4 mr-1" /> : <UserX className="w-4 h-4 mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{user.bookings}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">${user.spent.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
